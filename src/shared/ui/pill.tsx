import { cn } from "@/shared/lib/cn";

type PillProps = {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md";
};

export function Pill({ children, className, size = "md" }: PillProps) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full border border-black/12 bg-white/25 font-bold transition-colors duration-200",
        size === "sm" && "px-2.5 py-1.5 text-[10px] hover:bg-white/50",
        size === "md" && "px-3.5 py-2 text-[11px] hover:border-black/25 hover:bg-white/50",
        className,
      )}
    >
      {children}
    </span>
  );
}
