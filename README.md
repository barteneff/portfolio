# Ruslan Bartenev — Portfolio

Персональный сайт-портфолио Frontend-разработчика с двуязычной версткой (RU / EN) и CV-страницей с возможностью печати в PDF.

Живой сайт: https://brportfolio-ashy.vercel.app

## Стек

- **Next.js 16** (App Router, статическая генерация по локалям)
- **React 19**, **TypeScript**
- **Tailwind CSS 4**
- **Three.js** через **React Three Fiber** и **drei** (3D-сцены в hero и разделе соцсетей)
- **GSAP** и ScrollTrigger (анимации появления)
- Архитектура: **Feature-Sliced Design** (`entities`, `features`, `widgets`, `shared`)

## Запуск

```bash
npm install
npm run dev     # режим разработки: http://localhost:3000
npm run build   # production-сборка
npm run start   # запуск собранного проекта
npm run lint    # ESLint
```

## Структура

```
src/
├── app/            маршруты: [lang] (ru, en), /cv, robots.ts, sitemap.ts
├── entities/       доменные данные (соцсети)
├── features/       сценарии поведения (анимация появления)
├── widgets/        крупные блоки страницы (hero, header, cv, socials…)
├── shared/         конфиг сайта, i18n-словари, UI-примитивы
└── proxy.ts        редирект на локаль по заголовку Accept-Language
public/             изображения и 3D-модели (.glb)
```

## Локализация

Тексты лежат в `src/shared/i18n/dictionaries/{en,ru}.ts`. Типы в `types.ts` требуют одинакового набора ключей для обоих языков, поэтому при добавлении текста его нужно добавить в обе локали.

## Перед деплоем

Адрес сайта задан в `src/shared/config/site.ts` (`url`). От него зависят `metadataBase`, sitemap, robots.txt и JSON-LD.
