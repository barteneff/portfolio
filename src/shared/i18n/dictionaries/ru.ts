import type { Dictionary } from "../types";

export const dictionary: Dictionary = {
  meta: {
    title: "Ruslan Bartenev — Frontend-разработчик",
    description:
      "Frontend-разработчик: React, Next.js, TypeScript, сложные интерфейсы, архитектура фронтенда и Web3 / DeFi.",
  },
  menu: {
    open: "Открыть меню",
    close: "Закрыть меню",
    language: "Язык",
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
      "Собираю сложные веб-интерфейсы, бизнес-логику и масштабируемую frontend-архитектуру.",
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
    period: "04/2024 — н.в.",
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
    back: "НАЗАД К ПОРТФОЛИО",
    download: "СКАЧАТЬ PDF ↗",
    aboutLabel: "Профиль",
    about: [
      "Frontend-разработчик с опытом около двух с половиной лет в области Web3 и privacy-продуктов. Разрабатываю интерфейсы для работы с кошельками, блокчейн-транзакциями и backend-API: мульти-кошельки и кросс-чейн мосты, DeFi-интерфейсы, стейкинг, приватные переводы и административные панели.",
      "Работаю на TypeScript и React, сборка через Vite. Для UI использую Radix UI и Tailwind CSS, для управления состоянием — Redux Toolkit, TanStack Query и effector.",
    ],
    workLabel: "Опыт работы",
    summary:
      "Разработка frontend-приложений в области Web3, DeFi, кросс-чейн инфраструктуры и privacy-продуктов. Реализация сложных пользовательских сценариев, интеграция блокчейн-SDK и backend API, поддержка надёжных транзакционных потоков в нескольких сетях.",
    projects: [
      {
        title: "Кросс-чейн мост и стейкинг",
        stack:
          "React, TypeScript, Vite, Solana Wallet Adapter, RainbowKit, effector, Tailwind CSS",
        bullets: [
          "Разработал интерфейсы кросс-чейн моста между сетями Bitcoin, Solana и EVM, а также функциональность стейкинга.",
          "Реализовал подключение кошельков, отслеживание статуса транзакций, проверку газа и расчёт переводов с учётом комиссий.",
          "Добавил polling подтверждений транзакций в Solana и дедупликацию запросов для снижения избыточных вызовов backend-сервисов транзакций.",
          "Улучшил интерфейсы кошельков и blockchain explorer: определение кошелька, сценарии установки расширения, отображение данных транзакций.",
        ],
      },
      {
        title: "Мультикошелёк и кросс-чейн инфраструктура",
        stack:
          "React, TypeScript, wagmi, viem, Solana Wallet Adapter, LI.FI",
        bullets: [
          "Разработал унифицированный контроллер кошельков с поддержкой EVM, Solana, Bitcoin и Liquid: определение сети, получение балансов, управление состоянием кошелька.",
          "Интегрировал LI.FI для кросс-чейн маршрутизации и реализовал сценарии транзакций с состояниями загрузки, успеха и ошибки.",
          "Создал интерфейсы explorer для отображения транзакций и данных по сетям.",
        ],
      },
      {
        title: "DeFi-интерфейсы торговли",
        stack:
          "React, TypeScript, Redux Toolkit, TanStack Query, Uniswap SDK, Highcharts, lightweight-charts",
        bullets: [
          "Разработал интерфейсы свопа и пулов ликвидности: расчёт котировок, выбор маршрута, подтверждение транзакций.",
          "Реализовал управление лимит-ордерами: создание, отмену и отслеживание статуса.",
          "Создал торговые дашборды, интерактивные графики, лидерборды и механики ежедневной активности.",
          "Оптимизировал загрузку данных и управление состоянием интерфейса для снижения избыточных запросов и повышения отзывчивости.",
        ],
      },
      {
        title: "Privacy и платёжная платформа",
        stack:
          "React, TypeScript, Vite, Radix UI, Redux Toolkit, TanStack Query, React Hook Form, Jest",
        bullets: [
          "Разработал интерфейсы платёжного приложения и административные инструменты для аудита и настроек.",
          "Реализовал сценарии приватных переводов с интеграцией кошельков, управлением доступными нотами, проверками KYT и поддержкой EVM-адресов.",
          "Участвовал в автоматизированном тестировании escrow-сценариев и интеграции frontend с контрактами и SDK блокчейна.",
        ],
      },
    ],
    skillsLabel: "Технические навыки",
    skills: [
      {
        title: "Языки",
        items: ["TypeScript", "JavaScript", "HTML5", "CSS3", "SCSS"],
      },
      {
        title: "Фреймворки и сборка",
        items: ["React", "Next.js", "Vite", "React Router"],
      },
      {
        title: "Стейт и данные",
        items: ["Redux Toolkit", "TanStack Query", "effector", "REST API"],
      },
      {
        title: "UI и стилизация",
        items: ["Radix UI", "shadcn/ui", "Tailwind CSS", "lucide-react", "React Hook Form", "i18next"],
      },
      {
        title: "Web3 / блокчейн",
        items: ["wagmi", "viem", "Solana Wallet Adapter", "RainbowKit", "LI.FI", "Uniswap SDK", "Freighter", "Groth16"],
      },
      {
        title: "Смежное",
        items: ["NestJS", "Fastify", "Move (Sui)", "Solidity-тесты", "Gherkin"],
      },
      {
        title: "Инструменты",
        items: ["Jira", "GitHub", "GitLab CI", "DigitalOcean", "Jest", "ESLint"],
      },
    ],
    contactLabel: "Контакт",
    contacts: [
      { label: "Telegram", value: "@bartenevv_r" },
      { label: "Email", value: "bartenevv.rsn@gmail.com" },
      { label: "GitHub", value: "github.com/barteneff" },
    ],
  },
};
