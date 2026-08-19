"use client";

import type { MutableRefObject } from "react";
import { Suspense, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Center,
  Environment,
  Lightformer,
  MeshTransmissionMaterial,
  RoundedBox,
  useGLTF,
} from "@react-three/drei";
import * as THREE from "three";
import type { SocialItem } from "./carousel-api";

const FACE_Y = Math.PI / 2;
const TRANSITION_SEC = 0.82;
const REST_Y = -0.05;
const REST_X = 0.05;
const WHITE = new THREE.Color("#ffffff");

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
  samples: 3,
  resolution: 128,
  thickness: 2.2,
  roughness: 0.08,
  chromaticAberration: 0.025,
  envMapIntensity: 2.2,
  background: "#f8f8f8",
  ior: 1.5,
  distortion: 0.06,
  distortionScale: 0.18,
  anisotropy: 0.15,
  fadeWhiteLerp: 0.72,
};

type GlassTune = {
  roughness: number;
  thickness: number;
  chromaticAberration: number;
  envMapIntensity: number;
  ior: number;
  distortion: number;
  distortionScale: number;
  anisotropy: number;
  fadeWhiteLerp: number;
};

type GlassProfile = {
  color: string;
  tune: GlassTune;
};

const SOCIAL_GLASS: GlassTune = {
  roughness: 0.028,
  thickness: 2.6,
  chromaticAberration: 0.02,
  envMapIntensity: 3.0,
  ior: 1.8,
  distortion: 0.035,
  distortionScale: 0.11,
  anisotropy: 0.12,
  fadeWhiteLerp: 0.24,
};

function resolveGlassProfile(item: SocialItem): GlassProfile {
  return { color: item.color, tune: SOCIAL_GLASS };
}

function ease(t: number) {
  return THREE.MathUtils.smootherstep(t, 0, 1);
}

function resolveTint(hex: string) {
  const color = new THREE.Color(hex);
  const hsl = { h: 0, s: 0, l: 0 };
  color.getHSL(hsl);

  if (hsl.s < 0.08) {
    color.setHSL(0.58, 0.14, 0.15);
    return color;
  }

  color.setHSL(
    hsl.h,
    Math.min(Math.max(hsl.s * 0.78, 0.48), 0.8),
    0.17,
  );
  return color.lerp(WHITE, 0.06);
}

function GlassBody({
  color,
  tune,
  fade,
}: {
  color: string;
  tune: GlassTune;
  fade: MutableRefObject<number>;
}) {
  const material = useRef<THREE.MeshPhysicalMaterial | null>(null);
  const base = useMemo(() => resolveTint(color), [color]);
  const background = useMemo(
    () => new THREE.Color(GLASS.background),
    [],
  );

  useFrame(() => {
    const mat = material.current;
    if (!mat) return;
    const opacity = fade.current;
    mat.opacity = Math.max(opacity, 0.05);
    mat.envMapIntensity = tune.envMapIntensity * opacity;
    mat.color.copy(base).lerp(WHITE, (1 - opacity) * tune.fadeWhiteLerp);
  });

  return (
    <MeshTransmissionMaterial
      ref={(instance) => {
        material.current = instance as unknown as THREE.MeshPhysicalMaterial | null;
      }}
      backside
      samples={GLASS.samples}
      resolution={GLASS.resolution}
      thickness={tune.thickness}
      roughness={tune.roughness}
      chromaticAberration={tune.chromaticAberration}
      anisotropy={tune.anisotropy}
      distortion={tune.distortion}
      distortionScale={tune.distortionScale}
      temporalDistortion={0}
      color={base}
      transmission={1}
      ior={tune.ior}
      envMapIntensity={tune.envMapIntensity}
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
    const parts: THREE.BufferGeometry[] = [];

    root.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;
      const geometry = child.geometry.clone();
      geometry.applyMatrix4(child.matrixWorld);
      parts.push(geometry);
    });

    return parts;
  }, [gltf.scene]);
}

function useModelFitScale(parts: THREE.BufferGeometry[]) {
  return useMemo(() => {
    const box = new THREE.Box3();

    for (const geometry of parts) {
      geometry.computeBoundingBox();
      if (geometry.boundingBox) box.union(geometry.boundingBox);
    }

    const size = new THREE.Vector3();
    box.getSize(size);
    const footprint = Math.max(size.x, size.y, 0.0001);

    return 1 / footprint;
  }, [parts]);
}

function GlassModel({
  item,
  fade,
}: {
  item: SocialItem;
  fade: MutableRefObject<number>;
}) {
  const parts = useGlassParts(item.model!);
  const fitScale = useModelFitScale(parts);
  const profile = useMemo(
    () => resolveGlassProfile(item),
    [item.id, item.color],
  );

  return (
    <group rotation={[0, FACE_Y, 0]}>
      <group scale={fitScale}>
        <Center>
          {parts.map((geometry, index) => (
            <mesh key={index} geometry={geometry}>
              <GlassBody
                color={profile.color}
                tune={profile.tune}
                fade={fade}
              />
            </mesh>
          ))}
        </Center>
      </group>
    </group>
  );
}

function ItemVisual({
  item,
  fade,
}: {
  item: SocialItem;
  fade: MutableRefObject<number>;
}) {
  if (item.model) {
    return <GlassModel item={item} fade={fade} />;
  }
  return <GlassCube item={item} fade={fade} />;
}

function GlassCube({
  item,
  fade,
}: {
  item: SocialItem;
  fade: MutableRefObject<number>;
}) {
  const profile = useMemo(
    () => resolveGlassProfile(item),
    [item.id, item.color],
  );

  return (
    <RoundedBox args={[0.92, 0.92, 0.92]} radius={0.07} smoothness={4}>
      <GlassBody color={profile.color} tune={profile.tune} fade={fade} />
    </RoundedBox>
  );
}

function SocialModel({
  item,
  mode,
  progressRef,
  pointer,
  reduced,
}: {
  item: SocialItem;
  mode: "idle" | "leave" | "enter";
  progressRef: MutableRefObject<number>;
  pointer: MutableRefObject<{ x: number; y: number }>;
  reduced: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Group>(null);
  const fade = useRef(1);

  useLayoutEffect(() => {
    if (!inner.current) return;
    if (mode === "enter") {
      inner.current.rotation.set(REST_X + 0.02, -0.09, 0);
      return;
    }
    inner.current.rotation.set(REST_X, REST_Y, 0);
  }, [item.id, mode]);

  useFrame((state, frameDelta) => {
    if (!group.current || !inner.current) return;

    const progress = progressRef.current;
    const t = ease(progress);
    let x = 0;
    let y = 0;
    let z = 0;
    let scale = 1;
    let opacity = 1;
    let groupRotY = 0;
    let groupRotX = REST_X;
    const idle = mode === "idle" || (mode === "enter" && progress >= 1);

    const parallaxY =
      REST_Y + (reduced ? 0 : pointer.current.x * 0.26);
    const parallaxX =
      REST_X + (reduced ? 0 : -pointer.current.y * 0.12);

    let targetInnerY = parallaxY;
    let targetInnerX = parallaxX;

    if (mode === "leave") {
      x = t * 2.0;
      y = t * 0.1;
      z = t * 2.2;
      scale = 1 - t * 0.1;
      opacity = 1 - t;
      groupRotY = -t * 0.26;
      groupRotX = REST_X + t * 0.06;
      targetInnerY = THREE.MathUtils.lerp(REST_Y, REST_Y - 0.14, t);
      targetInnerX = REST_X;
    } else if (mode === "enter") {
      z = THREE.MathUtils.lerp(-0.38, 0, t);
      scale = THREE.MathUtils.lerp(0.88, 1, t);
      opacity = t;
      const enterY = THREE.MathUtils.lerp(-0.09, REST_Y, t);
      const parallaxBlend = t < 0.62 ? 0 : ease((t - 0.62) / 0.38);
      targetInnerY = THREE.MathUtils.lerp(enterY, parallaxY, parallaxBlend);
      targetInnerX = THREE.MathUtils.lerp(
        REST_X + 0.02,
        parallaxX,
        parallaxBlend,
      );
    }

    if (idle && !reduced) {
      y += Math.sin(state.clock.elapsedTime * 1.25) * 0.045;
    }

    fade.current = opacity;
    group.current.visible = opacity > 0.03;
    group.current.position.set(x, y, z);
    group.current.rotation.set(groupRotX, groupRotY, 0);
    group.current.scale.setScalar(scale);

    inner.current.rotation.y = THREE.MathUtils.damp(
      inner.current.rotation.y,
      targetInnerY,
      3.4,
      frameDelta,
    );
    inner.current.rotation.x = THREE.MathUtils.damp(
      inner.current.rotation.x,
      targetInnerX,
      3.4,
      frameDelta,
    );
  });

  return (
    <group ref={group}>
      <group ref={inner}>
        <ItemVisual item={item} fade={fade} />
      </group>
    </group>
  );
}

function GlassEnvironment() {
  return (
    <Environment frames={4} resolution={128} environmentIntensity={LIGHT.env}>
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

function SocialRig({
  item,
  reduced,
}: {
  item: SocialItem;
  reduced: boolean;
}) {
  const pointer = useRef({ x: 0, y: 0 });
  const shown = useRef(item);
  const [current, setCurrent] = useState(item);
  const [leaving, setLeaving] = useState<SocialItem | null>(null);
  const progress = useRef(1);

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useEffect(() => {
    if (item.id === shown.current.id) return;
    if (reduced) {
      setLeaving(null);
      shown.current = item;
      setCurrent(item);
      progress.current = 1;
      return;
    }
    setLeaving(shown.current);
    shown.current = item;
    setCurrent(item);
    progress.current = 0;
  }, [item, reduced]);

  useFrame((_, delta) => {
    if (progress.current >= 1) return;
    progress.current = Math.min(
      1,
      progress.current + delta / TRANSITION_SEC,
    );
    if (progress.current >= 1) setLeaving(null);
  });

  const animating = leaving !== null;

  return (
    <>
      {leaving && (
        <SocialModel
          key={`leave-${leaving.id}`}
          item={leaving}
          mode="leave"
          progressRef={progress}
          pointer={pointer}
          reduced={reduced}
        />
      )}
      <SocialModel
        key={`enter-${current.id}`}
        item={current}
        mode={animating ? "enter" : "idle"}
        progressRef={progress}
        pointer={pointer}
        reduced={reduced}
      />
    </>
  );
}

type SocialSceneProps = {
  item: SocialItem;
};

export function SocialScene({ item }: SocialSceneProps) {
  const root = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
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

  const running = visible && !reduced;

  return (
    <div ref={root} className="h-full w-full">
      <Canvas
        className="h-full w-full"
        dpr={[1, 1.25]}
        frameloop={running ? "always" : "demand"}
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
          <SocialRig item={item} reduced={reduced} />
        </Suspense>
      </Canvas>
    </div>
  );
}

for (const src of [
  "/model/linked.glb",
  "/model/telegram.glb",
  "/model/github.glb",
  "/model/inst.glb",
  "/model/youtube.glb",
]) {
  useGLTF.preload(src);
}
