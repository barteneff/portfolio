"use client";

import { Component, useCallback, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";
import { SectionLabel } from "@/shared/ui";
import type { SocialItem } from "./carousel-api";

const SocialScene = dynamic(
  () => import("./social-scene").then((mod) => mod.SocialScene),
  { ssr: false, loading: () => null },
);

type SocialCarouselProps = {
  items: SocialItem[];
  label: string;
  prev: string;
  next: string;
  open: string;
};

function LinksFallback({ items }: { items: SocialItem[] }) {
  return (
    <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-extrabold">
      {items.map((item) => (
        <SocialLink key={item.id} item={item} />
      ))}
    </div>
  );
}

function SocialLink({ item }: { item: SocialItem }) {
  const external = item.href.startsWith("http");
  return (
    <a
      href={item.href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
    >
      {item.name}
    </a>
  );
}

type BoundaryState = { failed: boolean };

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

export function SocialCarousel({
  items,
  label,
  prev,
  next,
  open,
}: SocialCarouselProps) {
  const [active, setActive] = useState(0);
  const count = items.length;
  const item = items[active] ?? items[0];

  const step = useCallback(
    (direction: number) => {
      setActive((current) => (current + direction + count) % count);
    },
    [count],
  );

  const goTo = useCallback((index: number) => {
    setActive(index);
  }, []);

  if (!item) return null;

  const external = item.href.startsWith("http");

  return (
    <div
      className="outline-none"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          step(-1);
        }
        if (event.key === "ArrowRight") {
          event.preventDefault();
          step(1);
        }
      }}
    >
      <nav className="sr-only">
        {items.map((entry) => (
          <SocialLink key={entry.id} item={entry} />
        ))}
      </nav>

      <div className="grid grid-cols-1 items-center gap-10 min-[901px]:grid-cols-[minmax(0,0.9fr)_minmax(0,1.15fr)] min-[901px]:gap-8 min-[901px]:min-h-[560px]">
        <div className="max-w-[460px]">
          <SectionLabel className="mb-6">{label}</SectionLabel>
          <div key={item.id}>
            <h2 className="m-0 text-[clamp(44px,7vw,76px)] leading-[0.88] font-extrabold tracking-[-0.06em]">
              {item.name}
            </h2>
            <p className="mt-4 text-[clamp(16px,2vw,22px)] leading-[1.4] text-muted">
              {item.caption}
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={item.href}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              className="rounded-full bg-text px-[22px] py-4 text-[11px] font-extrabold tracking-[0.08em] text-white transition-colors duration-200 hover:bg-[#383838]"
            >
              {open}
            </a>
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label={prev}
                className="cursor-pointer flex h-11 w-11 items-center justify-center rounded-full border border-line text-sm font-extrabold transition-opacity hover:opacity-60"
                onClick={() => step(-1)}
              >
                <img
                  src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNoZXZyb24tbGVmdC1pY29uIGx1Y2lkZS1jaGV2cm9uLWxlZnQiPjxwYXRoIGQ9Im0xNSAxOC02LTYgNi02Ii8+PC9zdmc+"
                  alt=""
                />
              </button>
              <button
                type="button"
                aria-label={next}
                className="cursor-pointer flex h-11 w-11 items-center justify-center rounded-full border border-line text-sm font-extrabold transition-opacity hover:opacity-60"
                onClick={() => step(1)}
              >
                <img
                  src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNoZXZyb24tcmlnaHQtaWNvbiBsdWNpZGUtY2hldnJvbi1yaWdodCI+PHBhdGggZD0ibTkgMTggNi02LTYtNiIvPjwvc3ZnPg=="
                  alt=""
                />
              </button>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-x-4 gap-y-2">
            {items.map((entry, index) => (
              <button
                key={entry.id}
                type="button"
                aria-current={index === active ? "true" : undefined}
                className={`cursor-pointer text-[11px] font-extrabold tracking-[0.08em] uppercase transition-[opacity,color] duration-200 ${index === active
                  ? "opacity-100"
                  : "opacity-[0.38] hover:opacity-80 hover:text-text"
                  }`}
                onClick={() => goTo(index)}
              >
                {entry.name}
              </button>
            ))}
          </div>
        </div>

        <div className="relative h-[min(520px,78vw)] min-h-[320px] w-full max-[600px]:h-[min(380px,88vw)]">
          <SceneBoundary fallback={<LinksFallback items={items} />}>
            <SocialScene item={item} />
          </SceneBoundary>
        </div>
      </div>
    </div>
  );
}
