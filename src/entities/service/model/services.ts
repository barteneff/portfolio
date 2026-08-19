export type Service = {
  number: string;
  title: string;
  description: string;
};

export const services: Service[] = [
  {
    number: "01",
    title: "BUILD COMPLEX INTERFACES",
    description:
      "Data-heavy dashboards, admin workspaces, tables, filters, pagination, dialogs, forms and responsive UI.",
  },
  {
    number: "02",
    title: "IMPLEMENT BUSINESS LOGIC",
    description:
      "RBAC, API integrations, transaction states, validation, wallet flows, loading and error scenarios.",
  },
  {
    number: "03",
    title: "BUILD SCALABLE FRONTENDS",
    description:
      "Feature-Sliced Design, TanStack Query, design systems, reusable components and stable application architecture.",
  },
];
