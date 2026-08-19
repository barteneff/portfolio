"use client";

import { cn } from "@/shared/lib/cn";

type DownloadPdfProps = {
  label: string;
  className?: string;
};

export function DownloadPdf({ label, className }: DownloadPdfProps) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className={cn(
        "rounded-full bg-text px-[22px] py-3 text-[11px] font-extrabold tracking-[0.08em] text-white transition-colors duration-200 hover:bg-[#383838]",
        className,
      )}
    >
      {label}
    </button>
  );
}
