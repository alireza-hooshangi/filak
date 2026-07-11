import "server-only";

import en from "@/dictionaries/en.json";
import fa from "@/dictionaries/fa.json";

export const locales = ["fa", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "fa";

export function isLocale(value: string): value is Locale {
	return locales.includes(value as Locale);
}

const dictionaries = {
	fa,
	en,
};

export function getDictionary(locale: Locale) {
	return dictionaries[locale];
}

export type Dictionary = ReturnType<typeof getDictionary>;
