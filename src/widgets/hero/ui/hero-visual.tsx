"use client";

import { Component, useEffect, useRef, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";

const HeroScene = dynamic(
  () => import("./hero-scene").then((mod) => mod.HeroScene),
  { ssr: false, loading: () => null },
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
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(true);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0.08 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={root}
      data-load="blob"
      className="relative isolate h-[min(560px,72vw)] min-h-90 w-full max-[900px]:h-[min(420px,88vw)]"
    >
      <SceneBoundary fallback={null}>
        <div className="absolute inset-0 flex items-center justify-center">
          <HeroScene active={active} />
        </div>
      </SceneBoundary>
    </div>
  );
}
