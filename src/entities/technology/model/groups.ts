export type TechnologyGroup = {
  id: string;
  title: string;
  items: string[];
};

export const technologyGroups: TechnologyGroup[] = [
  {
    id: "core",
    title: "Core",
    items: ["React", "Next.js", "TypeScript", "JavaScript"],
  },
  {
    id: "state-data",
    title: "State & Data",
    items: [
      "Redux Toolkit",
      "Zustand",
      "TanStack Query",
      "REST API",
      "React Hook Form",
      "Zod",
    ],
  },
  {
    id: "ui",
    title: "UI",
    items: [
      "Tailwind CSS",
      "SCSS",
      "Material UI",
      "Ant Design",
      "NextUI",
      "shadcn/ui",
    ],
  },
  {
    id: "architecture-web3",
    title: "Architecture & Web3",
    items: [
      "FSD",
      "Design Systems",
      "Microfrontends",
      "Web3",
      "DeFi",
      "Uniswap",
    ],
  },
  {
    id: "tools",
    title: "Tools & Services",
    items: ["Git", "Vite", "Webpack", "Firebase", "Supabase"],
  },
];
