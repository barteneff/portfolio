export type SocialItem = {
  id: string;
  name: string;
  caption: string;
  href: string;
  icon: string;
  color: string;
  model?: string;
};

/** @deprecated use SocialItem */
export type CarouselItem = SocialItem;
