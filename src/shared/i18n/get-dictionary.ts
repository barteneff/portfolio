import { hasLocale, type Locale } from "./config";
import { dictionary as en } from "./dictionaries/en";
import { dictionary as ru } from "./dictionaries/ru";
import type { Dictionary } from "./types";

const dictionaries: Record<Locale, Dictionary> = { en, ru };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export { hasLocale };
export type { Locale, Dictionary };
