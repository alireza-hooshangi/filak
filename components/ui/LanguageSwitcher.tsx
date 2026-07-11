"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import type { Locale } from "@/lib/i18n";

type LanguageSwitcherProps = {
	lang: Locale;
};

export default function LanguageSwitcher({ lang }: LanguageSwitcherProps) {
	const pathname = usePathname();

	const getLocalizedPath = (locale: Locale) => {
		const hasLocalePrefix = /^\/(fa|en)(?=\/|$)/.test(pathname);

		if (hasLocalePrefix) {
			return pathname.replace(/^\/(fa|en)(?=\/|$)/, `/${locale}`);
		}

		return `/${locale}${pathname}`;
	};

	const languageClassName =
		"relative z-10 flex h-8 w-8 shrink-0 items-center justify-center font-sans text-sm font-medium leading-none";

	return (
		<div
			className="relative grid h-10 w-18 grid-cols-2 rounded-full bg-black/5 p-1"
			aria-label="Language selector"
		>
			<div
				aria-hidden="true"
				className={`absolute top-1 left-1 h-8 w-8 rounded-full bg-white transition-transform duration-300 ${
					lang === "fa" ? "translate-x-0" : "translate-x-8"
				}`}
			/>

			<Link
				href={getLocalizedPath("fa")}
				hrefLang="fa"
				aria-label="تغییر زبان به فارسی"
				aria-current={lang === "fa" ? "page" : undefined}
				className={languageClassName}
			>
				Fa
			</Link>

			<Link
				href={getLocalizedPath("en")}
				hrefLang="en"
				aria-label="Switch language to English"
				aria-current={lang === "en" ? "page" : undefined}
				className={languageClassName}
			>
				En
			</Link>
		</div>
	);
}
