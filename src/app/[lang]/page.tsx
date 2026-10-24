import { notFound } from "next/navigation";
import { socials } from "@/entities/social";
import { MotionRoot } from "@/features/motion";
import { site } from "@/shared/config";
import { getDictionary, hasLocale } from "@/shared/i18n";
import { Container } from "@/shared/ui";
import { About } from "@/widgets/about";
import { Contact } from "@/widgets/contact";
import { Experience } from "@/widgets/experience";
import { Footer } from "@/widgets/footer";
import { Header } from "@/widgets/header";
import { Hero } from "@/widgets/hero";
import { Services } from "@/widgets/services";
import { Socials } from "@/widgets/socials";
import { Technology } from "@/widgets/technology";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = getDictionary(lang);

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: "Frontend Developer",
    url: `${site.url}/${lang}`,
    email: site.emailHref.replace("mailto:", ""),
    worksFor: { "@type": "Organization", name: site.company },
    sameAs: socials.map((social) => social.href),
  };

  return (
    <MotionRoot>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <Header
        locale={lang}
        nav={dict.nav}
        menu={dict.menu}
        viewCv={dict.viewCv}
      />
      <Container>
        <main>
          <Hero locale={lang} hero={dict.hero} viewCv={dict.viewCv} />
          <About about={dict.about} />
          <Experience experience={dict.experience} />
          <Services services={dict.services} />
          <Technology technology={dict.technology} />
          <Socials socials={dict.socials} />
          <Contact contact={dict.contact} />
        </main>
        <Footer note={dict.footer.note} />
      </Container>
    </MotionRoot>
  );
}
