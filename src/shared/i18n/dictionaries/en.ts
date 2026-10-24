import type { Dictionary } from "../types";

export const dictionary: Dictionary = {
  meta: {
    title: "Ruslan Bartenev — Frontend Developer",
    description:
      "Frontend Developer specializing in React, Next.js, TypeScript, complex interfaces, frontend architecture and Web3 / DeFi.",
  },
  menu: {
    open: "Open menu",
    close: "Close menu",
    language: "Language",
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
    period: "04/2024 — PRESENT",
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
      "Frontend Developer with about two and a half years of experience in Web3 and privacy-focused products. I build interfaces that work with wallets, blockchain transactions and backend APIs: multi-wallet and cross-chain bridges, DeFi interfaces, staking, private transfers and administrative panels.",
      "I work with TypeScript and React, building with Vite. For UI I use Radix UI and Tailwind CSS; for state management, Redux Toolkit, TanStack Query and effector.",
    ],
    workLabel: "Work Experience",
    summary:
      "Developing frontend applications for Web3, DeFi, cross-chain infrastructure and privacy-focused products. Responsible for implementing complex UI workflows, integrating blockchain SDKs and backend APIs, and maintaining reliable transaction flows across multiple networks.",
    projects: [
      {
        title: "Cross-Chain Bridge & Staking Platform",
        stack: "React, TypeScript, Vite, Solana Wallet Adapter, RainbowKit, effector, Tailwind CSS",
        bullets: [
          "Developed frontend interfaces for a cross-chain bridge connecting Bitcoin, Solana, and EVM networks, along with staking functionality.",
          "Implemented wallet connectivity, transaction status tracking, gas validation, and fee-aware transfer calculations.",
          "Added Solana transaction confirmation polling and request deduplication to reduce redundant calls to backend transaction services.",
          "Improved wallet and blockchain explorer interfaces, including wallet detection, extension installation flows, and transaction data presentation.",
        ],
      },
      {
        title: "Multi-Wallet & Cross-Chain Infrastructure",
        stack: "React, TypeScript, wagmi, viem, Solana Wallet Adapter, LI.FI",
        bullets: [
          "Developed a unified wallet controller supporting EVM, Solana, Bitcoin, and Liquid, centralizing network detection, balance retrieval, and wallet state management.",
          "Integrated LI.FI for cross-chain routing and implemented transaction flows with loading, success, and error states.",
          "Built blockchain explorer interfaces for displaying transaction data and network-specific information.",
        ],
      },
      {
        title: "DeFi Trading Interfaces",
        stack: "React, TypeScript, Redux Toolkit, TanStack Query, Uniswap SDK, Highcharts, lightweight-charts",
        bullets: [
          "Developed swap and liquidity pool interfaces with quote calculations, route selection, and transaction confirmation flows.",
          "Implemented limit order management, including order creation, cancellation, and status tracking.",
          "Built trading dashboards, interactive charts, leaderboards, and daily engagement mechanics.",
          "Optimized data fetching and UI state management to reduce redundant requests and improve interface responsiveness.",
        ],
      },
      {
        title: "Privacy & Payments Platform",
        stack: "React, TypeScript, Vite, Radix UI, Redux Toolkit, TanStack Query, React Hook Form, Jest",
        bullets: [
          "Developed payment application interfaces and administrative tools for audit and configuration workflows.",
          "Implemented private transfer flows with wallet integration, available-note management, KYT checks, and EVM address support.",
          "Contributed to automated testing of escrow scenarios and frontend integration with blockchain contracts and SDKs.",
        ],
      },
    ],
    skillsLabel: "Technical Skills",
    skills: [
      {
        title: "Languages",
        items: ["TypeScript", "JavaScript", "HTML5", "CSS3", "SCSS"],
      },
      {
        title: "Frameworks & Build",
        items: ["React", "Next.js", "Vite", "React Router"],
      },
      {
        title: "State & Data",
        items: ["Redux Toolkit", "TanStack Query", "effector", "REST API"],
      },
      {
        title: "UI & Styling",
        items: ["Radix UI", "shadcn/ui", "Tailwind CSS", "lucide-react", "React Hook Form", "i18next"],
      },
      {
        title: "Web3 / Blockchain",
        items: ["wagmi", "viem", "Solana Wallet Adapter", "RainbowKit", "LI.FI", "Uniswap SDK", "Freighter", "Groth16"],
      },
      {
        title: "Related",
        items: ["NestJS", "Fastify", "Move (Sui)", "Solidity tests", "Gherkin"],
      },
      {
        title: "Tools",
        items: ["Jira", "GitHub", "GitLab CI", "DigitalOcean", "Jest", "ESLint"],
      },
    ],
    contactLabel: "Contact",
    contacts: [
      { label: "Telegram", value: "@bartenevv_r" },
      { label: "Email", value: "bartenevv.rsn@gmail.com" },
      { label: "GitHub", value: "github.com/barteneff" },
    ],
  },
};
