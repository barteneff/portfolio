import { cn } from "@/shared/lib/cn";

type DownloadPdfProps = {
  label: string;
  href: string;
  className?: string;
};

export function DownloadPdf({ label, href, className }: DownloadPdfProps) {
  return (
    <a
      href={href}
      download
      className={cn(
        "rounded-full bg-text px-[22px] py-3 text-[11px] font-extrabold tracking-[0.08em] text-white transition-colors duration-200 hover:bg-[#383838]",
        className,
      )}
    >
      {label}
    </a>
  );
}
