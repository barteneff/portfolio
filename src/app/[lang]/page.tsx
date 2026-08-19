import { notFound } from "next/navigation";
import { MotionRoot } from "@/features/motion";
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

  return (
    <MotionRoot>
      <Header locale={lang} nav={dict.nav} viewCv={dict.viewCv} />
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
