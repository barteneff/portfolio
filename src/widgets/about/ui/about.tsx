import type { Dictionary } from "@/shared/i18n";
import { GlassCard, Section, SectionShell } from "@/shared/ui";

type AboutProps = {
  about: Dictionary["about"];
};

export function About({ about }: AboutProps) {
  return (
    <Section id="about">
      <SectionShell label={about.label}>
        <p className="m-0 max-w-[930px] text-[clamp(38px,5.2vw,72px)] leading-[0.98] font-normal tracking-[-0.06em]">
          {about.lead}
          <span className="text-black/35">{about.emphasis}</span>
        </p>
        <div className="mt-[60px] grid grid-cols-1 gap-4 min-[601px]:grid-cols-2 min-[901px]:grid-cols-3">
          {about.cards.map((card) => (
            <GlassCard
              key={card.title}
              className="min-h-[170px] p-6 hover:-translate-y-0.5"
            >
              <strong className="mb-[42px] block text-[11px] font-extrabold tracking-[0.12em] uppercase">
                {card.title}
              </strong>
              <p className="m-0 text-sm leading-[1.4] text-muted">
                {card.description}
              </p>
            </GlassCard>
          ))}
        </div>
      </SectionShell>
    </Section>
  );
}
