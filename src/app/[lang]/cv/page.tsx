import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "@/shared/i18n";
import { CvSheet } from "@/widgets/cv";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/cv">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};

  const dict = getDictionary(lang);

  return {
    title: dict.cv.title,
    description: dict.meta.description,
    alternates: {
      canonical: `/${lang}/cv`,
      languages: {
        en: "/en/cv",
        ru: "/ru/cv",
        "x-default": "/en/cv",
      },
    },
  };
}

export default async function CvPage({ params }: PageProps<"/[lang]/cv">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = getDictionary(lang);

  return (
    <CvSheet
      locale={lang}
      cv={dict.cv}
      menu={dict.menu}
      role={dict.experience.role}
      period={dict.experience.period}
    />
  );
}
