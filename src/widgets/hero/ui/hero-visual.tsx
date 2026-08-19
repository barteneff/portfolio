"use client";

import { Component, type ReactNode } from "react";
import dynamic from "next/dynamic";
import { HeroFallback } from "./hero-fallback";

const HeroScene = dynamic(
  () => import("./hero-scene").then((mod) => mod.HeroScene),
  { ssr: false, loading: () => <HeroFallback /> },
);

type BoundaryState = {
  failed: boolean;
};

class SceneBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  BoundaryState
> {
  state: BoundaryState = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (this.state.failed) return this.props.fallback;
    return this.props.children;
  }
}

export function HeroVisual() {
  return (
    <div
      data-load="blob"
      className="relative isolate h-[min(560px,72vw)] min-h-90 w-full max-[900px]:h-[min(420px,88vw)]"
    >
      <SceneBoundary fallback={<HeroFallback />}>
        <div className="absolute inset-0 flex items-center justify-center">
          <HeroScene />
        </div>
      </SceneBoundary>
    </div>
  );
}
