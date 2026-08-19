import type { Dictionary } from "@/shared/i18n";
import { Section, SectionLabel } from "@/shared/ui";
import { TechnologyBoard } from "./technology-board";

type TechnologyProps = {
  technology: Dictionary["technology"];
};

export function Technology({ technology }: TechnologyProps) {
  return (
    <Section id="stack">
      <SectionLabel className="mb-10">{technology.label}</SectionLabel>
      <TechnologyBoard groups={technology.groups} />
    </Section>
  );
}
