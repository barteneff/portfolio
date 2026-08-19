import Link from "next/link";
import { site } from "@/shared/config";
import { locales, type Dictionary, type Locale } from "@/shared/i18n";
import { DownloadPdf } from "./download-pdf";

type CvSheetProps = {
  locale: Locale;
  cv: Dictionary["cv"];
  role: string;
  period: string;
};

export function CvSheet({ locale, cv, role, period }: CvSheetProps) {
  return (
    <div className="px-4 py-16 max-[600px]:py-10">
      <article className="cv-sheet mx-auto w-full max-w-[840px] bg-white px-8 py-10 shadow-[0_24px_80px_rgba(17,17,17,0.08)] max-[600px]:px-5 sm:px-12 sm:py-14">
        <div className="no-print mb-10 flex flex-wrap items-center justify-between gap-4">
          <Link
            href={`/${locale}`}
            className="text-[11px] font-extrabold tracking-[0.08em] opacity-50 transition-opacity hover:opacity-100"
          >
            {cv.back}
          </Link>
          <div className="flex items-center gap-4">
            <div className="flex gap-2 text-[11px] font-extrabold tracking-[0.1em]">
              {locales.map((item) => (
                <Link
                  key={item}
                  href={`/${item}/cv`}
                  className={
                    item === locale
                      ? "opacity-100"
                      : "opacity-50 transition-opacity hover:opacity-100"
                  }
                >
                  {item.toUpperCase()}
                </Link>
              ))}
            </div>
            <DownloadPdf label={cv.download} />
          </div>
        </div>

        <header className="border-b border-line pb-8">
          <h1 className="text-[clamp(40px,7vw,72px)] leading-[0.9] font-extrabold tracking-[-0.06em]">
            {site.name}
          </h1>
          <p className="mt-3 text-lg text-muted">{role}</p>
          <div className="mt-5 flex flex-col flex-wrap gap-x-6 gap-y-1">
            {cv.contacts.map((contact) => (
              <div key={contact.label} className="flex items-baseline gap-2 text-sm text-muted">
                <span className="text-[11px] font-extrabold tracking-[0.08em] uppercase">
                  {contact.label}:
                </span>
                <span>{contact.value}</span>
              </div>
            ))}
          </div>
        </header>

        <section className="border-b border-line py-8">
          <h2 className="text-[11px] font-extrabold tracking-[0.16em] text-muted uppercase">
            {cv.aboutLabel}
          </h2>
          <div className="mt-4 max-w-[640px] space-y-3 text-[15px] leading-[1.55] text-muted">
            {cv.about.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>

        <section className="border-b border-line py-8">
          <h2 className="text-[11px] font-extrabold tracking-[0.16em] text-muted uppercase">
            {cv.workLabel}
          </h2>
          <div className="mt-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-2xl font-extrabold tracking-[-0.04em]">
                {site.company}
              </p>
              <p className="mt-1 text-sm text-muted">{role}</p>
            </div>
            <p className="text-sm text-muted">{period}</p>
          </div>
          <p className="mt-4 max-w-[640px] text-[15px] leading-[1.55] text-muted">
            {cv.summary}
          </p>
          <div className="mt-8 space-y-8">
            {cv.projects.map((project) => (
              <div key={project.title}>
                <h3 className="text-lg font-extrabold tracking-[-0.03em]">
                  {project.title}
                </h3>
                <p className="mt-1 text-[12px] text-muted">{project.stack}</p>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-[14px] leading-[1.5] text-muted">
                  {project.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="pt-8">
          <h2 className="text-[11px] font-extrabold tracking-[0.16em] text-muted uppercase">
            {cv.skillsLabel}
          </h2>
          <div className="mt-5 grid gap-5 min-[601px]:grid-cols-2">
            {cv.skills.map((group) => (
              <div key={group.title}>
                <h3 className="text-[11px] font-extrabold tracking-[0.12em] text-muted uppercase">
                  {group.title}
                </h3>
                <p className="mt-2 text-[14px] leading-normal">{group.items.join(" · ")}</p>
              </div>
            ))}
          </div>
        </section>
      </article>
    </div>
  );
}
