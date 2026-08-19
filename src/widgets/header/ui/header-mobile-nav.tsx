"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { locales, type Dictionary, type Locale } from "@/shared/i18n";

type HeaderMobileNavProps = {
  nav: Dictionary["nav"];
  locale: Locale;
};

export function HeaderMobileNav({ nav, locale }: HeaderMobileNavProps) {
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
        aria-label={open ? "Close menu" : "Open menu"}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-line transition-opacity hover:opacity-60"
        onClick={() => setOpen((value) => !value)}
      >
        <span className="relative block h-3.5 w-3.5">
          <span
            className={`absolute left-0 h-px w-full bg-text transition-transform duration-200 ${
              open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
            }`}
          />
          <span
            className={`absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-text transition-opacity duration-200 ${
              open ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`absolute left-0 h-px w-full bg-text transition-all duration-200 ${
              open ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"
            }`}
          />
        </span>
      </button>

      <div
        className={`absolute top-[calc(100%+10px)] right-0 z-50 min-w-[168px] origin-top-right rounded-2xl border border-line bg-white/95 p-1.5 shadow-[0_10px_32px_rgba(17,17,17,0.08)] backdrop-blur-xl transition-[opacity,transform] duration-200 ${
          open
            ? "pointer-events-auto scale-100 opacity-100"
            : "pointer-events-none scale-[0.98] opacity-0"
        }`}
        aria-hidden={!open}
      >
        <nav className="flex flex-col">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-xl px-3 py-2.5 text-[11px] font-extrabold tracking-[0.1em] text-text/70 transition-[color,background-color] hover:bg-black/[0.04] hover:text-text"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="mt-1 border-t border-line pt-1">
          <div
            className="flex items-center gap-1 px-1"
            role="group"
            aria-label="Language"
          >
            {locales.map((item) => (
              <Link
                key={item}
                href={`/${item}`}
                aria-current={item === locale ? "true" : undefined}
                className={`flex-1 rounded-xl py-2 text-center text-[11px] font-extrabold tracking-[0.1em] transition-[color,background-color] ${
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
    </div>
  );
}
