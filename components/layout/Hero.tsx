import Link from "next/link";
import { getDictionary, type Locale } from "@/lib/i18n";
import Button from "../ui/Button";
import { ArrowDown } from "lucide-react";

type HeroProps = {
	lang: Locale;
};

export default function Hero({ lang }: HeroProps) {
	const dictionary = getDictionary(lang);

	return (
		<section className={`w-full min-h-dvh grid`}>
			<div
				className={`mx-auto grid max-w-208 w-full grid-rows-[1fr_auto]`}
			>
				<div className={`flex flex-col items-center justify-center`}>
					<h1
						className={`text-center ${lang === "fa" ? "font-bold text-6xl" : "font-semibold text-5xl"}`}
					>
						<div>{dictionary.hero.title}</div>
						<div>{dictionary.hero.description}</div>
					</h1>
				</div>
				<div
					className={`relative flex items-center justify-center w-full h-28`}
				>
					<div className={`relative flex size-12 animate-bounce`}>
						<Button
							lang={lang}
							iconOnly
							size="lg"
							color="secondary"
							href="#"
							className={`rounded-full! z-10`}
						>
							<ArrowDown className={`w-5 h-5`} />
						</Button>
						<span
							className={`absolute -z-10 inset-0 bg-violet-200 rounded-full animate-ping`}
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
