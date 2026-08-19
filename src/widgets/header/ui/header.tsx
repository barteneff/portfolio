import Link from "next/link";
import { site } from "@/shared/config";
import { locales, type Dictionary, type Locale } from "@/shared/i18n";
import { Container } from "@/shared/ui";
import { HeaderMobileNav } from "./header-mobile-nav";
import { ScrollTopLink } from "./scroll-top-link";

type HeaderProps = {
  locale: Locale;
  nav: Dictionary["nav"];
  viewCv: string;
};

export function Header({ locale, nav, viewCv }: HeaderProps) {
  return (
    <header
      data-load="nav"
      className="sticky top-0 z-50 bg-white/80 backdrop-blur-[20px]"
    >
      <Container className="flex h-[84px] items-center justify-between gap-4 max-[600px]:h-[72px]">
        <ScrollTopLink className="shrink-0 text-sm font-extrabold tracking-[-0.04em]">
          {site.shortName}
        </ScrollTopLink>

        <div className="hidden items-center gap-6 min-[901px]:flex">
          <nav className="flex gap-7 text-[11px] font-extrabold tracking-[0.1em]">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="opacity-50 transition-opacity duration-200 hover:opacity-100"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <Link
            href={`/${locale}/cv`}
            className="rounded-full bg-text px-3.5 py-2 text-[11px] font-extrabold tracking-[0.08em] text-white transition-colors duration-200 hover:bg-[#383838]"
          >
            {viewCv}
          </Link>
          <div className="flex gap-2 text-[11px] font-extrabold tracking-[0.1em]">
            {locales.map((item) => (
              <Link
                key={item}
                href={`/${item}`}
                className={
                  item === locale
                    ? "opacity-100"
                    : "opacity-50 transition-opacity duration-200 hover:opacity-100"
                }
              >
                {item.toUpperCase()}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 min-[901px]:hidden">
          <Link
            href={`/${locale}/cv`}
            className="rounded-full bg-text px-3 py-2 text-[10px] font-extrabold tracking-[0.08em] text-white transition-colors duration-200 hover:bg-[#383838]"
          >
            {viewCv}
          </Link>
          <HeaderMobileNav nav={nav} locale={locale} />
        </div>
      </Container>
    </header>
  );
}
