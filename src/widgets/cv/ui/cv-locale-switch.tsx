"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { locales, type Locale } from "@/shared/i18n";

const GLOBE_ICON =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWdsb2JlLWljb24gbHVjaWRlLWdsb2JlIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMCIvPjxwYXRoIGQ9Ik0xMiAyYTE0LjUgMTQuNSAwIDAgMCAwIDIwIDE0LjUgMTQuNSAwIDAgMCAwLTIwIi8+PHBhdGggZD0iTTIgMTJoMjAiLz48L3N2Zz4=";

type CvLocaleSwitchProps = {
  locale: Locale;
};

export function CvLocaleSwitch({ locale }: CvLocaleSwitchProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        aria-label="Language"
        className="flex h-10 w-10 items-center justify-center rounded-full border border-line transition-opacity hover:opacity-60"
        onClick={() => setOpen((value) => !value)}
      >
        <img src={GLOBE_ICON} alt="" className="h-[18px] w-[18px]" />
      </button>

      <div
        className={`absolute top-[calc(100%+10px)] right-0 z-50 min-w-[120px] origin-top-right rounded-2xl border border-line bg-white/95 p-1.5 shadow-[0_10px_32px_rgba(17,17,17,0.08)] backdrop-blur-xl transition-[opacity,transform] duration-200 ${
          open
            ? "pointer-events-auto scale-100 opacity-100"
            : "pointer-events-none scale-[0.98] opacity-0"
        }`}
        aria-hidden={!open}
      >
        <div className="flex flex-col gap-0.5" role="group" aria-label="Language">
          {locales.map((item) => (
            <Link
              key={item}
              href={`/${item}/cv`}
              aria-current={item === locale ? "true" : undefined}
              className={`rounded-xl px-3 py-2 text-center text-[11px] font-extrabold tracking-[0.1em] transition-[color,background-color] ${
                item === locale
                  ? "bg-text text-white"
                  : "text-text/55 hover:bg-black/[0.04] hover:text-text"
              }`}
              onClick={() => setOpen(false)}
            >
              {item.toUpperCase()}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
