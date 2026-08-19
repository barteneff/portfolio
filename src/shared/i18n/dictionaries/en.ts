import type { Dictionary } from "../types";

export const dictionary: Dictionary = {
  meta: {
    title: "Ruslan Bartenev — Frontend Developer",
    description:
      "Frontend Developer specializing in React, Next.js, TypeScript, complex interfaces, frontend architecture and Web3 / DeFi.",
  },
  nav: [
    { label: "ABOUT", href: "#about" },
    { label: "WORK", href: "#experience" },
    { label: "STACK", href: "#stack" },
    { label: "CONTACT", href: "#contact" },
  ],
  viewCv: "VIEW CV ↗",
  hero: {
    eyebrow: "Frontend Developer",
    stackLine: "React · Next.js · TypeScript",
    description:
      "I build complex web interfaces, business logic and scalable frontend architecture.",
    getInTouch: "GET IN TOUCH",
  },
  about: {
    label: "02 / About",
    lead: "Frontend Developer focused on ",
    emphasis:
      "complex interfaces, frontend architecture and business logic.",
    cards: [
      {
        title: "Complex UI",
        description:
          "Dashboards, admin workspaces, tables, filters, forms, drawers and dynamic data.",
      },
      {
        title: "Business Logic",
        description:
          "User flows, validation, permissions, transactions and API-driven states.",
      },
      {
        title: "Architecture",
        description:
          "Reusable components, state management, API integration and Feature-Sliced Design.",
      },
    ],
  },
  experience: {
    label: "03 / Selected Experience",
    role: "Frontend Developer",
    period: "DEC 2025 — PRESENT",
    projects: [
      {
        id: "privacy-compliance",
        number: "01",
        title: "Privacy & Compliance",
        details: [
          "Super Admin workspace with routing, workspace selection and RBAC",
          "Organization, administrator and auditor management",
          "KYT monitoring, statuses, details and provider settings",
        ],
        tags: ["React", "Next.js", "React Query", "FSD"],
      },
      {
        id: "cross-chain-wallet",
        number: "02",
        title: "Cross-Chain Wallet & Bridge",
        details: [
          "Wallet connection for EVM, Solana, Bitcoin and Liquid",
          "Dashboard with portfolio, balances and asset cards",
          "Transaction flows and Explorer loading/error states",
        ],
        tags: ["EVM", "Solana", "Bitcoin", "Liquid"],
      },
      {
        id: "defi-trading",
        number: "03",
        title: "DeFi Trading Platform",
        details: [
          "Swap, Bridge, Limit Orders and Liquidity Pools",
          "Lottery, competitions, activity streaks and rankings",
          "Dynamic trading data and responsive interfaces",
        ],
        tags: ["DeFi", "Swap", "Bridge", "Uniswap"],
      },
    ],
  },
  technology: {
    label: "05 / Technology",
    groups: [
      {
        id: "core",
        title: "Core",
        items: ["React", "Next.js", "TypeScript", "JavaScript"],
      },
      {
        id: "state-data",
        title: "State & Data",
        items: ["Redux", "Redux Toolkit", "Zustand", "TanStack Query", "REST API"],
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
        id: "forms",
        title: "Forms & Validation",
        items: ["React Hook Form", "Zod"],
      },
      {
        id: "architecture",
        title: "Architecture",
        items: [
          "Feature-Sliced Design",
          "Design Systems",
          "Microfrontends",
          "Module Federation",
        ],
      },
      {
        id: "web3",
        title: "Web3 / DeFi",
        items: [
          "Web3",
          "DeFi",
          "Uniswap",
          "Wallet integrations",
          "Swap",
          "Bridge",
          "Limit Orders",
          "Liquidity Pools",
        ],
      },
      {
        id: "tooling",
        title: "Tooling",
        items: ["Git", "GitHub", "GitLab", "Vite", "Webpack"],
      },
    ],
  },
  services: {
    label: "04 / What I Build",
    items: [
      {
        number: "01",
        title: "COMPLEX INTERFACES",
        description:
          "Data-heavy interfaces, dashboards, admin panels, filtering, pagination, dialogs, drawers and responsive UI.",
      },
      {
        number: "02",
        title: "BUSINESS LOGIC",
        description:
          "Forms, validation, user input, permissions, transaction states, loading and error scenarios.",
      },
      {
        number: "03",
        title: "SCALABLE FRONTENDS",
        description:
          "Reusable components, state management, API integration and Feature-Sliced Design.",
      },
      {
        number: "04",
        title: "WEB3 / DEFI",
        description:
          "Wallet interfaces, swaps, bridges, liquidity pools, trading flows and blockchain-related UX.",
      },
    ],
  },
  socials: {
    label: "06 / Find me",
    prev: "Previous",
    next: "Next",
    open: "OPEN ↗",
    captions: {
      linkedin: "Professional profile",
      telegram: "Contact me directly",
      github: "Projects & code",
      instagram: "Personal profile",
      youtube: "Talks & videos",
    },
  },
  contact: {
    label: "07 / Contact",
    headline: ["LET'S BUILD", "SOMETHING", "INTERESTING."],
    note: "Open to new opportunities and interesting products.",
    cta: "GET IN TOUCH ↗",
  },
  footer: {
    note: "FRONTEND DEVELOPER",
  },
  cv: {
    title: "Ruslan Bartenev — CV",
    back: "BACK TO PORTFOLIO",
    download: "DOWNLOAD PDF ↗",
    aboutLabel: "Profile",
    about: [
      "Frontend Developer with commercial experience building responsive, cross-platform web interfaces with React, Next.js and TypeScript.",
      "Experienced in developing complex interfaces, implementing business logic, integrating frontend with backend APIs, and working with dynamic data and asynchronous states.",
      "Worked on Web3, DeFi and privacy-focused platforms, including trading interfaces, cross-chain wallets, bridges, liquidity pools, limit orders and admin dashboards.",
    ],
    workLabel: "Work Experience",
    summary:
      "Developing Web3, DeFi and privacy-focused platforms using React, Next.js and TypeScript.",
    projects: [
      {
        title: "Privacy & Compliance Platform",
        stack: "React, Next.js, TypeScript, TanStack Query, Feature-Sliced Design",
        bullets: [
          "Developed a Super Admin workspace with routing, workspace selection, role-based access and organization management.",
          "Built interfaces for managing organizations and administrators, including tables, filters, dialogs, forms and detailed views.",
          "Developed a KYT Monitoring module with transaction filtering, status management, detailed transaction views and provider configuration.",
          "Integrated frontend applications with backend APIs using TanStack Query.",
          "Implemented loading and operation states including skeletons, pagination, dialogs and transaction receipts.",
          "Applied Feature-Sliced Design and permission-based access control within a multi-level workspace architecture.",
        ],
      },
      {
        title: "Cross-Chain Wallet & Bridge",
        stack: "React, Next.js, TypeScript, Web3",
        bullets: [
          "Worked with EVM, Solana, Bitcoin and Liquid wallets.",
          "Implemented wallet connection and management flows integrated with the backend.",
          "Developed interfaces for different transaction scenarios.",
          "Built a portfolio dashboard with asset cards, balances and application navigation.",
          "Developed an Explorer interface with responsive layouts, loading states and error handling.",
        ],
      },
      {
        title: "DeFi Trading Platform",
        stack: "React, Next.js, TypeScript, Web3, DeFi",
        bullets: [
          "Developed responsive interfaces for Swap, Bridge, Limit Orders and Liquidity Pools.",
          "Built interfaces for trading competitions and volume-based leaderboards.",
          "Worked with dynamic trading data and complex UI states.",
          "Implemented business logic for Web3 trading workflows.",
        ],
      },
    ],
    skillsLabel: "Technical Skills",
    skills: [
      {
        title: "Core",
        items: ["JavaScript", "TypeScript", "React", "Next.js", "HTML5", "CSS3"],
      },
      {
        title: "State Management & Data",
        items: ["Redux", "Redux Toolkit", "Zustand", "TanStack Query", "REST API"],
      },
      {
        title: "Forms & Validation",
        items: ["React Hook Form", "Zod"],
      },
      {
        title: "UI & Styling",
        items: ["Tailwind CSS", "SCSS", "Material UI", "Ant Design", "NextUI", "shadcn/ui"],
      },
      {
        title: "Architecture",
        items: ["Feature-Sliced Design", "Design Systems", "Microfrontends"],
      },
      {
        title: "Web3 / DeFi",
        items: ["Wallet Integration", "Swap", "Bridge", "Liquidity Pools", "Limit Orders", "Uniswap", "Web3"],
      },
      {
        title: "Tooling",
        items: ["Git", "GitHub", "Vite", "Webpack"],
      },
    ],
    contactLabel: "Contact",
    contacts: [
      { label: "Telegram", value: "@bartenevv_r" },
      { label: "Email", value: "bartenevv.rsn@gmail.com / barteneffrus@yandex.com" },
      { label: "GitHub", value: "github.com/barteneff" },
    ],
  },
};
