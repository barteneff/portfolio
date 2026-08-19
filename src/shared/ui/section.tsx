import { cn } from "@/shared/lib/cn";

type SectionProps = {
  id?: string;
  children: React.ReactNode;
  className?: string;
  reveal?: boolean;
};

export function Section({
  id,
  children,
  className,
  reveal = true,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-[84px] py-[110px] max-[600px]:scroll-mt-[72px] max-[600px]:py-20",
        className,
      )}
    >
      <div data-reveal={reveal ? "" : undefined}>{children}</div>
    </section>
  );
}
