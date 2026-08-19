"use client";

import type { MutableRefObject } from "react";
import {
  Suspense,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Center,
  Environment,
  Lightformer,
  MeshTransmissionMaterial,
  Resize,
  RoundedBox,
  useGLTF,
} from "@react-three/drei";
import * as THREE from "three";
import {
  carouselGoTo,
  carouselStep,
  createCarouselApi,
  type CarouselApi,
  type CarouselHandle,
  type CarouselItem,
} from "./carousel-api";

const FACE_Y = Math.PI / 2;
const AUTO_GAP = 4800;
const WHITE = new THREE.Color("#ffffff");

/**
 *
 * Свет идёт слева направо: главное окно слева (windowLeft).
 * Стекло почти не видит key/rim/fill — крути windowLeft.
 *
 * [x, y, z]: x вправо, y вверх, z к камере.
 */

const LIGHT = {
  showAxes: false,
  ambient: 0.45,
  key: {
    position: [3.4, 5.2, 4] as [number, number, number],
    intensity: 14,
    color: "#fff7fb",
    angle: 0.42,
    penumbra: 0.9,
  },
  rim: {
    position: [-3.6, 2.2, 2.4] as [number, number, number],
    intensity: 5,
    color: "#24d9ff",
    angle: 0.5,
    penumbra: 1,
  },
  env: 1.4,
  windowLeft: {
    position: [-4, 0.9, 0.2] as [number, number, number],
    scale: [8, 12] as [number, number],
    intensity: 1,
    color: "#fff7ee",
  },
  windowRight: {
    position: [4.2, 1.2, 0.2] as [number, number, number],
    scale: [6, 9] as [number, number],
    intensity: 0.35,
    color: "#d7ecff",
  },
  roomFront: {
    position: [-2, 1, 5.4] as [number, number, number],
    scale: [12, 10] as [number, number],
    intensity: 1.2,
    color: "#ffffff",
  },
  ceiling: {
    position: [0, 5.5, 0] as [number, number, number],
    scale: 10,
    intensity: 0.85,
  },
};

const GLASS = {
  samples: 5,
  resolution: 256,
  thickness: 2.2,
  roughness: 0.08,
  chromaticAberration: 0.025,
  envMapIntensity: 2.2,
  background: "#f8f8f8",
};

function wrappedDelta(index: number, progress: number, count: number) {
  let delta = index - progress;
  delta = ((delta % count) + count) % count;
  if (delta >= count / 2) delta -= count;
  return delta;
}

function activeIndex(progress: number, count: number) {
  return ((Math.round(progress) % count) + count) % count;
}

function neighbors(center: number, count: number) {
  return [(center - 1 + count) % count, center, (center + 1) % count];
}

function pose(delta: number) {
  const incoming = Math.max(delta, 0);
  const outgoing = Math.max(-delta, 0);

  return {
    x: outgoing * 2.4,
    y: outgoing * 0.14,
    z: outgoing * 2.5 + incoming * 0.35,
    scale: Math.max(
      0.12,
      0.86 * (1 - incoming * 0.18) * (1 + outgoing * 0.04),
    ),
    opacity: THREE.MathUtils.clamp(
      delta >= 0 ? 1 - incoming * 1.4 : 1 - outgoing * 1.2,
      0,
      1,
    ),
    rotX: 0.05 + outgoing * 0.08,
    rotY: -outgoing * 0.32,
  };
}

function liftTint(hex: string) {
  const color = new THREE.Color(hex);
  const hsl = { h: 0, s: 0, l: 0 };
  color.getHSL(hsl);
  if (hsl.l < 0.28) {
    color.setHSL(hsl.h, hsl.s * 0.25, 0.46);
    return color;
  }
  return color.lerp(WHITE, 0.16);
}

function GlassBody({
  color,
  fade,
}: {
  color: string;
  fade: MutableRefObject<number>;
}) {
  const material = useRef<THREE.MeshPhysicalMaterial | null>(null);
  const base = useMemo(() => liftTint(color), [color]);
  const background = useMemo(
    () => new THREE.Color(GLASS.background),
    [],
  );

  useFrame(() => {
    const mat = material.current;
    if (!mat) return;
    const opacity = fade.current;
    mat.opacity = Math.max(opacity, 0.05);
    mat.envMapIntensity = GLASS.envMapIntensity * opacity;
    mat.color.copy(base).lerp(WHITE, (1 - opacity) * 0.72);
  });

  return (
    <MeshTransmissionMaterial
      ref={(instance) => {
        material.current = instance as unknown as THREE.MeshPhysicalMaterial | null;
      }}
      backside
      samples={GLASS.samples}
      resolution={GLASS.resolution}
      thickness={GLASS.thickness}
      roughness={GLASS.roughness}
      chromaticAberration={GLASS.chromaticAberration}
      anisotropy={0.15}
      distortion={0.06}
      distortionScale={0.18}
      temporalDistortion={0}
      color={base}
      transmission={1}
      ior={1.5}
      envMapIntensity={GLASS.envMapIntensity}
      background={background}
      transparent
      opacity={1}
    />
  );
}

function useGlassParts(src: string) {
  const gltf = useGLTF(src);

  return useMemo(() => {
    const root = gltf.scene.clone(true);
    root.updateMatrixWorld(true);
    const parts: { geometry: THREE.BufferGeometry; name: string }[] = [];

    root.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;
      const geometry = child.geometry.clone();
      geometry.applyMatrix4(child.matrixWorld);
      const material = Array.isArray(child.material)
        ? child.material[0]
        : child.material;
      parts.push({ geometry, name: material?.name ?? "" });
    });

    return parts;
  }, [gltf.scene]);
}

function GlassModel({
  src,
  color,
  fade,
}: {
  src: string;
  color: string;
  fade: MutableRefObject<number>;
}) {
  const parts = useGlassParts(src);

  return (
    <group rotation={[0, FACE_Y, 0]}>
      <group scale={1.28}>
        <Resize depth>
          <Center>
            {parts.map((part, index) => (
              <mesh key={index} geometry={part.geometry}>
                <GlassBody
                  color={part.name === "accent" ? "#ffffff" : color}
                  fade={fade}
                />
              </mesh>
            ))}
          </Center>
        </Resize>
      </group>
    </group>
  );
}

function GlassCube({
  color,
  fade,
}: {
  color: string;
  fade: MutableRefObject<number>;
}) {
  return (
    <RoundedBox args={[0.92, 0.92, 0.92]} radius={0.07} smoothness={4}>
      <GlassBody color={color} fade={fade} />
    </RoundedBox>
  );
}

function Item({
  item,
  index,
  count,
  api,
  pointer,
  reduced,
  onSelect,
}: {
  item: CarouselItem;
  index: number;
  count: number;
  api: MutableRefObject<CarouselApi>;
  pointer: MutableRefObject<{ x: number; y: number }>;
  reduced: boolean;
  onSelect: (index: number) => void;
}) {
  const group = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Group>(null);
  const fade = useRef(1);

  useFrame((state, frameDelta) => {
    if (!group.current || !inner.current) return;
    const delta = wrappedDelta(index, api.current.progress, count);
    const next = pose(delta);
    const active = Math.abs(delta) < 0.45;
    const bob =
      active && !reduced ? Math.sin(state.clock.elapsedTime * 1.25) * 0.045 : 0;

    fade.current = next.opacity;
    group.current.visible = next.opacity > 0.03;
    group.current.position.set(next.x, next.y + bob, next.z);
    group.current.rotation.set(next.rotX, next.rotY, 0);
    group.current.scale.setScalar(next.scale);

    const lookY =
      active && !reduced ? 0.16 + pointer.current.x * 0.42 : 0.16;
    const lookX =
      active && !reduced ? 0.05 - pointer.current.y * 0.16 : 0.05;
    inner.current.rotation.y = THREE.MathUtils.damp(
      inner.current.rotation.y,
      lookY,
      3.4,
      frameDelta,
    );
    inner.current.rotation.x = THREE.MathUtils.damp(
      inner.current.rotation.x,
      lookX,
      3.4,
      frameDelta,
    );
  });

  return (
    <group
      ref={group}
      onClick={(event) => {
        event.stopPropagation();
        if (api.current.didDrag) return;
        onSelect(index);
      }}
    >
      <group ref={inner}>
        {item.model ? (
          <GlassModel src={item.model} color={item.color} fade={fade} />
        ) : (
          <GlassCube color={item.color} fade={fade} />
        )}
      </group>
    </group>
  );
}

function DragRig({ api }: { api: MutableRefObject<CarouselApi> }) {
  const { gl } = useThree();

  useEffect(() => {
    const el = gl.domElement;
    let pointer = 0;
    let lastX = 0;
    let moved = 0;
    let snapTimer = 0;

    const pause = () => {
      api.current.pausedUntil = performance.now() + AUTO_GAP;
    };

    const snap = () => {
      api.current.target = Math.round(api.current.target);
    };

    const down = (event: PointerEvent) => {
      pointer = event.pointerId;
      lastX = event.clientX;
      moved = 0;
      api.current.dragging = true;
      api.current.didDrag = false;
      pause();
      el.setPointerCapture(event.pointerId);
    };

    const move = (event: PointerEvent) => {
      if (pointer === 0 || event.pointerId !== pointer) return;
      const dx = event.clientX - lastX;
      lastX = event.clientX;
      moved += Math.abs(dx);
      if (moved > 6) api.current.didDrag = true;
      api.current.target += (dx / Math.max(el.clientWidth, 1)) * 1.6;
    };

    const up = (event: PointerEvent) => {
      if (event.pointerId !== pointer && event.type !== "pointercancel") return;
      pointer = 0;
      api.current.dragging = false;
      snap();
    };

    const wheel = (event: WheelEvent) => {
      event.preventDefault();
      pause();
      api.current.target += event.deltaY / 480 + event.deltaX / 480;
      window.clearTimeout(snapTimer);
      snapTimer = window.setTimeout(snap, 150);
    };

    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
    el.addEventListener("wheel", wheel, { passive: false });

    return () => {
      window.clearTimeout(snapTimer);
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
      el.removeEventListener("wheel", wheel);
    };
  }, [api, gl]);

  return null;
}

function GlassEnvironment() {
  return (
    <Environment frames={4} resolution={256} environmentIntensity={LIGHT.env}>
      <Lightformer
        form="rect"
        intensity={LIGHT.roomFront.intensity}
        color={LIGHT.roomFront.color}
        scale={LIGHT.roomFront.scale}
        position={LIGHT.roomFront.position}
      />
      <Lightformer
        form="rect"
        intensity={LIGHT.windowRight.intensity}
        color={LIGHT.windowRight.color}
        scale={LIGHT.windowRight.scale}
        position={LIGHT.windowRight.position}
      />
      <Lightformer
        form="rect"
        intensity={LIGHT.windowLeft.intensity}
        color={LIGHT.windowLeft.color}
        scale={LIGHT.windowLeft.scale}
        position={LIGHT.windowLeft.position}
      />
      <Lightformer
        intensity={LIGHT.ceiling.intensity}
        color="#ffffff"
        scale={LIGHT.ceiling.scale}
        position={LIGHT.ceiling.position}
        rotation-x={Math.PI / 2}
      />
    </Environment>
  );
}

function Rig({
  items,
  reduced,
  handleRef,
  onActiveChange,
}: {
  items: CarouselItem[];
  reduced: boolean;
  handleRef: MutableRefObject<CarouselHandle | null>;
  onActiveChange: (index: number) => void;
}) {
  const api = useRef(createCarouselApi());
  const pointer = useRef({ x: 0, y: 0 });
  const last = useRef(-1);
  const autoAt = useRef(0);
  const count = items.length;
  const [center, setCenter] = useState(0);

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useImperativeHandle(
    handleRef,
    () => ({
      step: (direction: number) => carouselStep(api.current, direction),
      goTo: (index: number) => carouselGoTo(api.current, index, count),
      setHover: (value: boolean) => {
        api.current.hover = value;
      },
    }),
    [count],
  );

  useFrame((_, delta) => {
    const state = api.current;
    const now = performance.now();
    if (autoAt.current === 0) autoAt.current = now + AUTO_GAP;

    if (now < state.pausedUntil) {
      autoAt.current = state.pausedUntil + AUTO_GAP;
    } else if (
      !reduced &&
      !state.dragging &&
      !state.hover &&
      now > autoAt.current
    ) {
      carouselStep(state, 1);
      autoAt.current = now + AUTO_GAP;
    }

    state.progress = THREE.MathUtils.damp(
      state.progress,
      state.target,
      reduced ? 16 : 3.6,
      delta,
    );

    const index = activeIndex(state.progress, count);
    if (index !== last.current) {
      last.current = index;
      setCenter(index);
      onActiveChange(index);
    }
  });

  return (
    <>
      <DragRig api={api} />
      {neighbors(center, count).map((index) => {
        const item = items[index];
        if (!item) return null;
        return (
          <Item
            key={item.id}
            item={item}
            index={index}
            count={count}
            api={api}
            pointer={pointer}
            reduced={reduced}
            onSelect={(selected) => {
              if (selected === activeIndex(api.current.progress, count)) return;
              carouselGoTo(api.current, selected, count);
            }}
          />
        );
      })}
    </>
  );
}

type SocialSceneProps = {
  items: CarouselItem[];
  handleRef: MutableRefObject<CarouselHandle | null>;
  onActiveChange: (index: number) => void;
};

export function SocialScene({
  items,
  handleRef,
  onActiveChange,
}: SocialSceneProps) {
  const root = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [reduced, setReduced] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(media.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.12 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={root} className="h-full w-full cursor-grab active:cursor-grabbing">
      <Canvas
        className="h-full w-full touch-none"
        dpr={[1, 1.5]}
        frameloop={reduced ? "demand" : "always"}
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 0.12, 2.6], fov: 32 }}
        onCreated={({ gl }) => {
          gl.setClearColor(0xffffff, 0);
        }}
      >
        {LIGHT.showAxes && <axesHelper args={[2]} />}
        <color attach="background" args={["#ffffff"]} />
        <ambientLight intensity={LIGHT.ambient} />
        <spotLight
          position={LIGHT.key.position}
          intensity={LIGHT.key.intensity}
          angle={LIGHT.key.angle}
          penumbra={LIGHT.key.penumbra}
          color={LIGHT.key.color}
        />
        <spotLight
          position={LIGHT.rim.position}
          intensity={LIGHT.rim.intensity}
          angle={LIGHT.rim.angle}
          penumbra={LIGHT.rim.penumbra}
          color={LIGHT.rim.color}
        />
        <Suspense fallback={null}>
          <GlassEnvironment />
          <Rig
            items={items}
            reduced={reduced}
            handleRef={handleRef}
            onActiveChange={onActiveChange}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload("/model/inst.glb");
useGLTF.preload("/model/youtube.glb");
