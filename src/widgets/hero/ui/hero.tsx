import Link from "next/link";
import { site } from "@/shared/config";
import type { Dictionary, Locale } from "@/shared/i18n";
import { Pill } from "@/shared/ui";
import { HeroVisual } from "./hero-visual";

type HeroProps = {
  locale: Locale;
  hero: Dictionary["hero"];
  viewCv: string;
};

export function Hero({ locale, hero, viewCv }: HeroProps) {
  return (
    <section className="grid min-h-[760px] grid-cols-1 items-center gap-[50px] py-20 max-[600px]:py-[65px] max-[600px]:pb-20 min-[901px]:grid-cols-[1.15fr_0.85fr] min-[901px]:min-h-[760px] min-[901px]:pt-20 min-[901px]:pb-[110px]">
      <div>
        <div data-load="name">
          <p className="mb-2 text-[11px] font-extrabold tracking-[0.16em] text-muted uppercase">
            {hero.eyebrow}
          </p>
          <p className="mb-6 text-[11px] font-extrabold tracking-[0.16em] text-muted uppercase">
            {hero.stackLine}
          </p>
          <h1 className="m-0 text-[clamp(76px,11vw,158px)] leading-[0.79] font-extrabold tracking-[-0.085em] max-[600px]:text-[clamp(68px,20vw,112px)]">
            {site.firstName}
            <br />
            {site.lastName}
          </h1>
        </div>
        <div data-load="copy">
          <p className="mt-[34px] max-w-[570px] text-[clamp(18px,2vw,25px)] leading-[1.35] tracking-[-0.02em]">
            {hero.description}
          </p>
          <div className="mt-7 flex flex-wrap gap-2">
            {site.heroPills.map((pill) => (
              <Pill key={pill}>{pill}</Pill>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href={`/${locale}/cv`}
              className="rounded-full border border-black/12 px-[22px] py-4 text-[11px] font-extrabold tracking-[0.08em] transition-colors duration-200 hover:bg-black/[0.04]"
            >
              {viewCv}
            </Link>
            <a
              href="#contact"
              className="rounded-full bg-text px-[22px] py-4 text-[11px] font-extrabold tracking-[0.08em] text-white transition-colors duration-200 hover:bg-[#383838]"
            >
              {hero.getInTouch}
            </a>
          </div>
        </div>
      </div>
      <HeroVisual />
    </section>
  );
}
