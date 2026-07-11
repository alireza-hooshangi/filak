import type { ReactNode } from "react";
import { notFound } from "next/navigation";

import "../globals.css";

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { outfit, kalameh } from "@/lib/fonts";
import { isLocale, locales } from "@/lib/i18n";

type LanguageLayoutProps = {
	children: ReactNode;
	params: Promise<{
		lang: string;
	}>;
};

export function generateStaticParams() {
	return locales.map((lang) => ({ lang }));
}

export default async function LanguageLayout({
	children,
	params,
}: LanguageLayoutProps) {
	const { lang } = await params;

	if (!isLocale(lang)) {
		notFound();
	}

	const direction = lang === "fa" ? "rtl" : "ltr";
	const activeFont = lang === "fa" ? kalameh : outfit;

	return (
		<html
			lang={lang}
			dir={direction}
			className={`${kalameh.variable} ${outfit.variable} bg-stone-100`}
		>
			<body
				className={`${activeFont.className} grid min-h-screen grid-rows-[1fr_auto]`}
			>
				<Header lang={lang} />

				<main className="min-w-0">{children}</main>

				<Footer lang={lang} />
			</body>
		</html>
	);
}
