export type Project = {
  id: string;
  number: string;
  title: string;
  description: string;
  tags: string[];
};

export const experience = {
  company: "POLYNOM LABS",
  role: "Frontend Developer",
  period: "DEC 2025 — PRESENT",
  summary:
    "Building Web3, DeFi and privacy-focused applications with React, Next.js and TypeScript — complex UI, business logic, API integrations and scalable frontend architecture.",
} as const;

export const projects: Project[] = [
  {
    id: "privacy-compliance",
    number: "01",
    title: "Privacy & Compliance Platform",
    description:
      "Super Admin workspace with routing, workspace selection and RBAC. Organization and auditor management, KYT monitoring, TanStack Query and FSD across a multi-level architecture.",
    tags: ["Next.js", "TypeScript", "TanStack Query", "FSD"],
  },
  {
    id: "cross-chain-wallet",
    number: "02",
    title: "Cross-Chain Wallet & Bridge",
    description:
      "Wallet connection for EVM, Solana, Bitcoin and Liquid. Dashboard with portfolio and balances, transaction success/error flows and Explorer UX.",
    tags: ["EVM", "Solana", "Bitcoin", "Liquid"],
  },
  {
    id: "defi-trading",
    number: "03",
    title: "DeFi Trading Platform",
    description:
      "Swap, Bridge, Limit Orders and Liquidity Pools. Lottery, trading competitions, activity streaks and volume leaderboards with live pool data.",
    tags: ["DeFi", "Swap", "Bridge", "Uniswap"],
  },
];
