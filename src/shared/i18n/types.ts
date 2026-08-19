export type Dictionary = {
  meta: {
    title: string;
    description: string;
  };
  nav: { label: string; href: string }[];
  viewCv: string;
  hero: {
    eyebrow: string;
    stackLine: string;
    description: string;
    getInTouch: string;
  };
  about: {
    label: string;
    lead: string;
    emphasis: string;
    cards: { title: string; description: string }[];
  };
  experience: {
    label: string;
    role: string;
    period: string;
    projects: {
      id: string;
      number: string;
      title: string;
      details: string[];
      tags: string[];
    }[];
  };
  technology: {
    label: string;
    groups: { id: string; title: string; items: string[] }[];
  };
  services: {
    label: string;
    items: { number: string; title: string; description: string }[];
  };
  socials: {
    label: string;
    prev: string;
    next: string;
    open: string;
    captions: {
      linkedin: string;
      telegram: string;
      github: string;
      instagram: string;
      youtube: string;
    };
  };
  contact: {
    label: string;
    headline: string[];
    note: string;
    cta: string;
  };
  footer: {
    note: string;
  };
  cv: {
    title: string;
    back: string;
    download: string;
    aboutLabel: string;
    about: string[];
    workLabel: string;
    summary: string;
    projects: {
      title: string;
      stack: string;
      bullets: string[];
    }[];
    skillsLabel: string;
    skills: { title: string; items: string[] }[];
    contactLabel: string;
    contacts: { label: string; value: string }[];
  };
};
