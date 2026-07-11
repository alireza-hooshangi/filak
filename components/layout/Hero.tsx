import Link from "next/link";
import { getDictionary, type Locale } from "@/lib/i18n";

type HeroProps = {
	lang: Locale;
};

export default function Hero({ lang }: HeroProps) {
	const dictionary = getDictionary(lang);

	return (
		<section
			className={`w-full min-h-dvh flex items-center justify-center`}
		>
			<div
				className={`mx-auto grid max-w-208 gap-12 text-center ${lang === "fa" ? "font-bold text-6xl" : "font-semibold text-5xl"}`}
			>
				<h1 className={`text-center`}>
					<div>{dictionary.hero.title}</div>
					<div>{dictionary.hero.description}</div>
				</h1>
			</div>
		</section>
	);
}
