import { socials } from "@/entities/social";
import type { Dictionary } from "@/shared/i18n";
import { Section } from "@/shared/ui";
import { SocialCarousel } from "./social-carousel";

type SocialsProps = {
  socials: Dictionary["socials"];
};

export function Socials({ socials: content }: SocialsProps) {
  const items = socials.map((social) => ({
    id: social.id,
    name: social.name,
    caption: content.captions[social.id],
    href: social.href,
    icon: social.icon,
    color: social.color,
    model: social.model,
  }));

  return (
    <Section>
      <SocialCarousel
        items={items}
        label={content.label}
        prev={content.prev}
        next={content.next}
        open={content.open}
      />
    </Section>
  );
}
