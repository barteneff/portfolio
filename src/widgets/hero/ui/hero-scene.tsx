"use client";

import { Suspense, useLayoutEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Bounds,
  Center,
  Environment,
  Lightformer,
  MeshTransmissionMaterial,
  useGLTF,
  useTexture,
} from "@react-three/drei";
import * as THREE from "three";

const MODEL_SRC = "/model/user.glb";
const PHOTO_SRC = "/test-photo.jpg";

useGLTF.preload(MODEL_SRC);
useTexture.preload(PHOTO_SRC);

function GlassUser() {
  const { nodes } = useGLTF(MODEL_SRC);
  const photo = useTexture(PHOTO_SRC);
  const plane = nodes.Plane as THREE.Mesh;
  photo.colorSpace = THREE.SRGBColorSpace;

  return (
    <Center>
      <mesh geometry={plane.geometry} quaternion={plane.quaternion} castShadow={false}>
        <MeshTransmissionMaterial
          backside
          samples={4}
          resolution={128}
          thickness={2.2}
          roughness={0.08}
          chromaticAberration={0.025}
          anisotropy={0.15}
          distortion={0.06}
          distortionScale={0.18}
          temporalDistortion={0}
          color="#d9edff"
          transmission={1}
          ior={1.5}
          envMapIntensity={2.2}
          background={photo}
        />
      </mesh>
    </Center>
  );
}

function PhotoEnvironment() {
  const photo = useTexture(PHOTO_SRC);
  photo.colorSpace = THREE.SRGBColorSpace;
  photo.wrapS = THREE.ClampToEdgeWrapping;
  photo.wrapT = THREE.ClampToEdgeWrapping;

  return (
    <Environment frames={1} resolution={128} environmentIntensity={1.5}>
      <Lightformer
        form="rect"
        intensity={5}
        map={photo}
        scale={[7.4, 9.2]}
        position={[0.15, 0.4, 5]}
      />
      <Lightformer
        form="rect"
        intensity={2.2}
        map={photo}
        scale={[6.2, 8]}
        position={[-4.4, 0.9, 2.2]}
        rotation-y={0.72}
      />
      <Lightformer
        form="rect"
        intensity={1.4}
        map={photo}
        scale={[5.4, 7]}
        position={[4, 0.15, -2]}
        rotation-y={Math.PI + 0.35}
      />
      <Lightformer
        intensity={1.6}
        color="#ffffff"
        scale={12}
        position={[0, 5.5, 0]}
        rotation-x={Math.PI / 2}
      />
      <Lightformer
        intensity={0.85}
        color="#ff2ca8"
        scale={3.4}
        position={[4.6, 1.3, 1.1]}
      />
      <Lightformer
        intensity={0.7}
        color="#24d9ff"
        scale={3.4}
        position={[-4.8, -0.5, 0.7]}
      />
    </Environment>
  );
}

function Rig({ reduced }: { reduced: boolean }) {
  const group = useRef<THREE.Group>(null);
  const { invalidate } = useThree();

  useLayoutEffect(() => {
    if (reduced) invalidate();
  }, [invalidate, reduced]);

  useFrame((state, delta) => {
    if (!group.current || reduced) return;
    const time = state.clock.elapsedTime;
    const targetY = 0.8 + state.pointer.x * 0.6;
    const targetX = 0.08 - state.pointer.y * 0.2;
    group.current.rotation.y = THREE.MathUtils.damp(
      group.current.rotation.y,
      targetY,
      3.2,
      delta,
    );
    group.current.rotation.x = THREE.MathUtils.damp(
      group.current.rotation.x,
      targetX,
      3.2,
      delta,
    );
    group.current.position.y = Math.sin(time * 0.65) * 0.04;
  });

  return (
    <group ref={group} rotation={[0.08, 0.38, -0.15]}>
      <GlassUser />
    </group>
  );
}

export function HeroScene({ active = true }: { active?: boolean }) {
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const running = active && !reduced;

  return (
    <Canvas
      className="h-full w-full touch-none"
      dpr={[1, 1.25]}
      frameloop={running ? "always" : "demand"}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0.12, 2.6], fov: 32 }}
      onCreated={({ gl }) => {
        gl.setClearColor(0xffffff, 0);
      }}
    >
      <color attach="background" args={["#ffffff"]} />
      <ambientLight intensity={0.45} />
      <spotLight
        position={[3.4, 5.2, 4]}
        intensity={14}
        angle={0.42}
        penumbra={0.9}
        color="#fff7fb"
      />
      <spotLight
        position={[-3.6, 2.2, 2.4]}
        intensity={5}
        angle={0.5}
        penumbra={1}
        color="#24d9ff"
      />
      <Suspense fallback={null}>
        <PhotoEnvironment />
        <Bounds fit margin={1}>
          <Rig reduced={reduced} />
        </Bounds>
      </Suspense>
    </Canvas>
  );
}
