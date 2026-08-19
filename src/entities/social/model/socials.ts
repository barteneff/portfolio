export type SocialId =
  | "linkedin"
  | "telegram"
  | "github"
  | "instagram"
  | "youtube";

export type Social = {
  id: SocialId;
  name: string;
  caption: string;
  icon: string;
  href: string;
  glow: string;
  color: string;
  model?: string;
};

export const socials: Social[] = [
  {
    id: "linkedin",
    name: "LinkedIn",
    caption: "Professional profile",
    icon: "in",
    href: "https://www.linkedin.com/in/bartenevv/",
    glow: "inset 0 -80px 100px rgba(36, 102, 255, 0.10)",
    color: "#0077B5",
    model: "/model/linked.glb",
  },
  {
    id: "telegram",
    name: "Telegram",
    caption: "Contact me directly",
    icon: "✈",
    href: "https://t.me/bartenevv_r",
    glow: "inset 0 -80px 100px rgba(36, 217, 255, 0.10)",
    color: "#2AABEE",
    model: "/model/telegram.glb",
  },
  {
    id: "github",
    name: "GitHub",
    caption: "Projects & code",
    icon: "⌘",
    href: "https://github.com/barteneff",
    model: "/model/github.glb",
    glow: "inset 0 -80px 100px rgba(17, 17, 17, 0.09)",
    color: "#101010",
  },
  {
    id: "instagram",
    name: "Instagram",
    caption: "Personal profile",
    icon: "◎",
    href: "https://www.instagram.com/npm_ruslan/",
    glow: "inset 0 -80px 100px rgba(255, 60, 180, 0.10)",
    color: "#f4b8d4",
    model: "/model/inst.glb",
  },
  {
    id: "youtube",
    name: "YouTube",
    caption: "Talks & videos",
    icon: "▶",
    href: "https://www.youtube.com/@bartenevv",
    glow: "inset 0 -80px 100px rgba(255, 0, 48, 0.10)",
    color: "#c81612",
    model: "/model/youtube.glb",
  },
];
