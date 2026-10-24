import type { MetadataRoute } from "next";
import { site } from "@/shared/config";
import { locales } from "@/shared/i18n";

const pages = ["", "/cv"];

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((lang) =>
    pages.map((page) => ({
      url: `${site.url}/${lang}${page}`,
      alternates: {
        languages: Object.fromEntries(
          locales.map((other) => [other, `${site.url}/${other}${page}`]),
        ),
      },
    })),
  );
}
