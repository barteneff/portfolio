export type AboutCard = {
  title: string;
  description: string;
};

export const about = {
  lead: "Frontend developer focused on ",
  emphasis:
    "complex interfaces, business logic and scalable frontend architecture.",
  cards: [
    {
      title: "Complex UI",
      description:
        "Super Admin workspaces, dashboards, data tables, filters, dialogs, forms and responsive layouts.",
    },
    {
      title: "Business Logic",
      description:
        "RBAC, API-driven states, wallet and transaction flows, validation, loading and error UX.",
    },
    {
      title: "Architecture",
      description:
        "Feature-Sliced Design, TanStack Query, permission-based access and reusable UI systems.",
    },
  ] satisfies AboutCard[],
};
