import { site } from "@/shared/config";
import type { Dictionary } from "@/shared/i18n";
import { GlassCard, Pill, Section, SectionShell } from "@/shared/ui";

type ExperienceProps = {
  experience: Dictionary["experience"];
};

export function Experience({ experience }: ExperienceProps) {
  return (
    <Section id="experience">
      <SectionShell label={experience.label}>
        <div className="mb-6 flex justify-between gap-[30px]">
          <div>
            <div className="text-[clamp(28px,3vw,42px)] font-extrabold tracking-[-0.05em]">
              {site.company}
            </div>
            <div className="mt-1.5 text-[13px] text-muted">{experience.role}</div>
          </div>
          <div className="text-[13px] text-muted">{experience.period}</div>
        </div>

        <div className="grid gap-2.5">
          {experience.projects.map((project) => (
            <GlassCard
              key={project.id}
              as="article"
              className="group p-6 max-[600px]:p-5"
            >
              <div className="flex min-w-0 flex-1 gap-[18px]">
                <div className="pt-1 text-xs text-muted">{project.number}</div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-[25px] font-extrabold tracking-[-0.04em]">
                    {project.title}
                  </h3>
                  <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out group-hover:grid-rows-[1fr] max-[900px]:grid-rows-[1fr]">
                    <div className="overflow-hidden">
                      <ul className="mt-3 max-w-[560px] space-y-1 text-sm leading-[1.4] text-muted">
                        {project.details.map((detail) => (
                          <li key={detail}>{detail}</li>
                        ))}
                      </ul>
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {project.tags.map((tag) => (
                          <Pill key={tag} size="sm" className="bg-white/45">
                            {tag}
                          </Pill>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </SectionShell>
    </Section>
  );
}
