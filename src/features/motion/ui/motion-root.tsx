"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/shared/lib/gsap";

type MotionRootProps = {
  children: React.ReactNode;
};

export function MotionRoot({ children }: MotionRootProps) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      const blob = '[data-load="blob"]';
      const name = '[data-load="name"]';
      const copy = '[data-load="copy"]';
      const nav = '[data-load="nav"]';

      gsap.set([blob, name, copy, nav], { y: 16 });

      gsap
        .timeline({ defaults: { ease: "power2.out", duration: 0.75 } })
        .to(blob, { opacity: 1, y: 0 })
        .to(name, { opacity: 1, y: 0 }, "-=0.5")
        .to(copy, { opacity: 1, y: 0 }, "-=0.5")
        .to(nav, { opacity: 1, y: 0 }, "-=0.45");

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              once: true,
            },
            onComplete: () => {
              gsap.set(el, { clearProps: "transform" });
            },
          },
        );
      });
    },
    { scope: root },
  );

  return <div ref={root}>{children}</div>;
}
