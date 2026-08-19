import { site } from "@/shared/config";
import type { Dictionary } from "@/shared/i18n";
import { Section, SectionLabel } from "@/shared/ui";

type ContactProps = {
  contact: Dictionary["contact"];
};

export function Contact({ contact }: ContactProps) {
  return (
    <Section
      id="contact"
      className="flex min-h-[650px] flex-col justify-center"
    >
      <SectionLabel className="mb-6">{contact.label}</SectionLabel>
      <h2 className="m-0 max-w-[1100px] text-[clamp(68px,10.5vw,152px)] leading-[0.79] font-extrabold tracking-[-0.085em]">
        {contact.headline.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </h2>
      <div className="mt-14 flex items-end justify-between gap-[30px] max-[900px]:flex-col max-[900px]:items-start">
        <p className="m-0 max-w-[440px] text-[17px] leading-[1.45] text-muted">
          {contact.note}
        </p>
        <a
          href={site.emailHref}
          className="rounded-full bg-text px-[22px] py-4 text-[11px] font-extrabold tracking-[0.08em] text-white transition-colors duration-200 hover:bg-[#383838]"
        >
          {contact.cta}
        </a>
      </div>
    </Section>
  );
}
