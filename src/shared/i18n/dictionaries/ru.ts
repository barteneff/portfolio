import type { Dictionary } from "../types";

export const dictionary: Dictionary = {
  meta: {
    title: "Ruslan Bartenev — Frontend-разработчик",
    description:
      "Frontend-разработчик: React, Next.js, TypeScript, сложные интерфейсы, архитектура фронтенда и Web3 / DeFi.",
  },
  nav: [
    { label: "О СЕБЕ", href: "#about" },
    { label: "ОПЫТ", href: "#experience" },
    { label: "СТЕК", href: "#stack" },
    { label: "КОНТАКТ", href: "#contact" },
  ],
  viewCv: "СМОТРЕТЬ CV ↗",
  hero: {
    eyebrow: "Frontend-разработчик",
    stackLine: "React · Next.js · TypeScript",
    description:
      "Собираю сложные веб-интерфейсы, бизнес-логику и масштабируемые фронтенд-приложения.",
    getInTouch: "НАПИСАТЬ",
  },
  about: {
    label: "02 / О себе",
    lead: "Frontend-разработчик, сфокусированный на ",
    emphasis: "сложных интерфейсах, архитектуре фронтенда и бизнес-логике.",
    cards: [
      {
        title: "Сложный UI",
        description:
          "Дашборды, админские воркспейсы, таблицы, фильтры, формы, drawer'ы и динамические данные.",
      },
      {
        title: "Бизнес-логика",
        description:
          "Пользовательские сценарии, валидация, права доступа, транзакции и состояния из API.",
      },
      {
        title: "Архитектура",
        description:
          "Переиспользуемые компоненты, стейт-менеджмент, интеграции с API и Feature-Sliced Design.",
      },
    ],
  },
  experience: {
    label: "03 / Избранный опыт",
    role: "Frontend-разработчик",
    period: "дек. 2025 — н.в.",
    projects: [
      {
        id: "privacy-compliance",
        number: "01",
        title: "Privacy & Compliance",
        details: [
          "Super Admin: маршрутизация, выбор воркспейса и RBAC",
          "Управление организациями, администраторами и аудиторами",
          "KYT-мониторинг, статусы, детали и настройки провайдера",
        ],
        tags: ["React", "Next.js", "React Query", "FSD"],
      },
      {
        id: "cross-chain-wallet",
        number: "02",
        title: "Cross-Chain Wallet & Bridge",
        details: [
          "Подключение кошельков EVM, Solana, Bitcoin и Liquid",
          "Дашборд с портфелем, балансами и карточками активов",
          "Транзакционные сценарии и loading/error UX в Explorer",
        ],
        tags: ["EVM", "Solana", "Bitcoin", "Liquid"],
      },
      {
        id: "defi-trading",
        number: "03",
        title: "DeFi Trading Platform",
        details: [
          "Swap, Bridge, лимитные ордера и пулы ликвидности",
          "Лотерея, соревнования, стрики и рейтинги",
          "Динамические торговые данные и адаптивные интерфейсы",
        ],
        tags: ["DeFi", "Swap", "Bridge", "Uniswap"],
      },
    ],
  },
  technology: {
    label: "05 / Технологии",
    groups: [
      {
        id: "core",
        title: "Основа",
        items: ["React", "Next.js", "TypeScript", "JavaScript"],
      },
      {
        id: "state-data",
        title: "Стейт и данные",
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
        title: "Формы и валидация",
        items: ["React Hook Form", "Zod"],
      },
      {
        id: "architecture",
        title: "Архитектура",
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
        title: "Инструменты",
        items: ["Git", "GitHub", "GitLab", "Vite", "Webpack"],
      },
    ],
  },
  services: {
    label: "04 / Что собираю",
    items: [
      {
        number: "01",
        title: "СЛОЖНЫЕ ИНТЕРФЕЙСЫ",
        description:
          "Тяжёлые интерфейсы, дашборды, админки, фильтры, пагинация, диалоги, drawer'ы и адаптивный UI.",
      },
      {
        number: "02",
        title: "БИЗНЕС-ЛОГИКА",
        description:
          "Формы, валидация, пользовательский ввод, права, состояния транзакций, loading и ошибки.",
      },
      {
        number: "03",
        title: "МАСШТАБИРУЕМЫЙ ФРОНТЕНД",
        description:
          "Переиспользуемые компоненты, стейт-менеджмент, интеграции с API и Feature-Sliced Design.",
      },
      {
        number: "04",
        title: "WEB3 / DEFI",
        description:
          "Интерфейсы кошельков, свапы, бриджи, пулы ликвидности, торговые сценарии и blockchain UX.",
      },
    ],
  },
  socials: {
    label: "06 / Где найти",
    prev: "Назад",
    next: "Вперёд",
    open: "ПЕРЕЙТИ ↗",
    captions: {
      linkedin: "Профессиональный профиль",
      telegram: "Написать напрямую",
      github: "Проекты и код",
      instagram: "Личный профиль",
      youtube: "Выступления и видео",
    },
  },
  contact: {
    label: "07 / Контакт",
    headline: ["ДАВАЙТЕ СДЕЛАЕМ", "ЧТО-ТО", "ИНТЕРЕСНОЕ."],
    note: "Открыт к новым возможностям и интересным продуктам.",
    cta: "НАПИСАТЬ ↗",
  },
  footer: {
    note: "FRONTEND-РАЗРАБОТЧИК",
  },
  cv: {
    title: "Ruslan Bartenev — CV",
    back: "← НАЗАД К ПОРТФОЛИО",
    download: "СКАЧАТЬ PDF ↗",
    aboutLabel: "Профиль",
    about: [
      "Frontend-разработчик с коммерческим опытом разработки адаптивных кроссплатформенных веб-интерфейсов на React, Next.js и TypeScript.",
      "Опыт в разработке сложных интерфейсов, реализации бизнес-логики, интеграции фронтенда с backend API и работе с динамическими данными и асинхронными состояниями.",
      "Работал над Web3, DeFi и privacy-платформами: торговые интерфейсы, кросс-чейн кошельки, бриджи, пулы ликвидности, лимитные ордера и административные дашборды.",
    ],
    workLabel: "Опыт работы",
    summary:
      "Разработка Web3, DeFi и privacy-платформ на React, Next.js и TypeScript.",
    projects: [
      {
        title: "Privacy & Compliance Platform",
        stack: "React, Next.js, TypeScript, TanStack Query, Feature-Sliced Design",
        bullets: [
          "Разработал Super Admin воркспейс: маршрутизация, выбор воркспейса, ролевой доступ и управление организациями.",
          "Интерфейсы управления организациями и администраторами: таблицы, фильтры, диалоги, формы и детальные карточки.",
          "Модуль KYT Monitoring: фильтрация транзакций, управление статусами, детальные экраны и настройки провайдера.",
          "Интеграция фронтенда с backend API через TanStack Query.",
          "Loading и UX-состояния: скелетоны, пагинация, диалоги и квитанции транзакций.",
          "Feature-Sliced Design и доступ по правам в многоуровневой архитектуре воркспейсов.",
        ],
      },
      {
        title: "Cross-Chain Wallet & Bridge",
        stack: "React, Next.js, TypeScript, Web3",
        bullets: [
          "Работа с EVM, Solana, Bitcoin и Liquid кошельками.",
          "Подключение и управление кошельками с интеграцией с backend.",
          "Интерфейсы для различных сценариев транзакций.",
          "Дашборд портфеля: карточки активов, балансы и навигация.",
          "Explorer: адаптивная вёрстка, loading-состояния и обработка ошибок.",
        ],
      },
      {
        title: "DeFi Trading Platform",
        stack: "React, Next.js, TypeScript, Web3, DeFi",
        bullets: [
          "Адаптивные интерфейсы Swap, Bridge, Limit Orders и Liquidity Pools.",
          "Интерфейсы торговых соревнований и лидербордов по объёму.",
          "Работа с динамическими торговыми данными и сложными UI-состояниями.",
          "Реализация бизнес-логики Web3 торговых сценариев.",
        ],
      },
    ],
    skillsLabel: "Технические навыки",
    skills: [
      {
        title: "Основное",
        items: ["JavaScript", "TypeScript", "React", "Next.js", "HTML5", "CSS3"],
      },
      {
        title: "Стейт и данные",
        items: ["Redux", "Redux Toolkit", "Zustand", "TanStack Query", "REST API"],
      },
      {
        title: "Формы и валидация",
        items: ["React Hook Form", "Zod"],
      },
      {
        title: "UI и стилизация",
        items: ["Tailwind CSS", "SCSS", "Material UI", "Ant Design", "NextUI", "shadcn/ui"],
      },
      {
        title: "Архитектура",
        items: ["Feature-Sliced Design", "Design Systems", "Microfrontends"],
      },
      {
        title: "Web3 / DeFi",
        items: ["Wallet Integration", "Swap", "Bridge", "Liquidity Pools", "Limit Orders", "Uniswap", "Web3"],
      },
      {
        title: "Инструменты",
        items: ["Git", "GitHub", "Vite", "Webpack"],
      },
    ],
    contactLabel: "Контакт",
    contacts: [
      { label: "Telegram", value: "@bartenevv_r" },
      { label: "Email", value: "bartenevv.rsn@gmail.com / barteneffrus@yandex.com" },
      { label: "GitHub", value: "github.com/barteneff / Старый профиль: github.com/barteneffrus" },
    ],
  },
};
