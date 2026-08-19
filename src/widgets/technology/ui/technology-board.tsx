"use client";

import { useEffect, useState } from "react";
import type { Dictionary } from "@/shared/i18n";
import { TechGrid } from "./tech-grid";
import { TechnologyScene } from "./technology-scene";

type TechGroup = Dictionary["technology"]["groups"][number];

export function TechnologyBoard({ groups }: { groups: TechGroup[] }) {
  const [useScene, setUseScene] = useState(false);

  useEffect(() => {
    const wide = window.matchMedia("(min-width: 901px)");
    const motion = window.matchMedia("(prefers-reduced-motion: no-preference)");
    const sync = () => setUseScene(wide.matches && motion.matches);
    sync();
    wide.addEventListener("change", sync);
    motion.addEventListener("change", sync);
    return () => {
      wide.removeEventListener("change", sync);
      motion.removeEventListener("change", sync);
    };
  }, []);

  if (!useScene) {
    return <TechGrid groups={groups} />;
  }

  return <TechnologyScene groups={groups} />;
}
