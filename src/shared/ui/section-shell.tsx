import { SectionLabel } from "./section-label";

type SectionShellProps = {
  label: string;
  children: React.ReactNode;
};

export function SectionShell({ label, children }: SectionShellProps) {
  return (
    <div className="grid grid-cols-1 gap-14 max-[900px]:gap-[25px] min-[901px]:grid-cols-[190px_1fr]">
      <SectionLabel>{label}</SectionLabel>
      <div>{children}</div>
    </div>
  );
}
