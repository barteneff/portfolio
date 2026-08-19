import type { Dictionary } from "@/shared/i18n";
import { cn } from "@/shared/lib/cn";
import { Section, SectionShell } from "@/shared/ui";

type ServicesProps = {
  services: Dictionary["services"];
};

export function Services({ services }: ServicesProps) {
  return (
    <Section id="build">
      <SectionShell label={services.label}>
        <div>
          {services.items.map((service, index) => (
            <div
              key={service.number}
              className={cn(
                "group grid grid-cols-[70px_1fr] gap-[22px] border-b border-line py-[30px]",
                index === 0 && "border-t",
              )}
            >
              <div className="text-xs text-muted">{service.number}</div>
              <div>
                <div className="text-[clamp(27px,3vw,42px)] font-extrabold tracking-[-0.05em] transition-[letter-spacing,color] duration-300 group-hover:tracking-[-0.03em]">
                  {service.title}
                </div>
                <p className="mt-2.5 max-w-[650px] text-[15px] leading-[1.5] text-muted">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </SectionShell>
    </Section>
  );
}
