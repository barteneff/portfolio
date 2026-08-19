import { cn } from "@/shared/lib/cn";

type SectionLabelProps = {
  children: React.ReactNode;
  className?: string;
};

export function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <div
      className={cn(
        "text-[11px] font-extrabold tracking-[0.16em] text-muted uppercase",
        className,
      )}
    >
      {children}
    </div>
  );
}
