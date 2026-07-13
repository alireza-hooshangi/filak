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
		<section className={`w-full min-h-dvh grid px-12`}>
			<div
				className={`flex flex-col space-y-12 items-center justify-center mx-auto max-w-md md:max-w-2xl`}
			>
				<div className={`flex flex-col items-center justify-center`}>
					<h1
						lang={lang}
						className={`text-heading-md md:text-heading-lg font-strong text-center text-fg`}
					>
						<div>{dictionary.hero.title}</div>
						<div>{dictionary.hero.description}</div>
					</h1>
				</div>
				<div className={`relative flex size-12 animate-bounce`}>
					<Button
						lang={lang}
						iconOnly
						radius="full"
						size="lg"
						color="secondary"
						href="#age-groups"
						className={`z-10`}
					>
						<ArrowDown className={`w-5 h-5`} />
					</Button>
					<span
						className={`absolute -z-10 inset-0 bg-black/15 rounded-full animate-ping`}
					/>
				</div>
			</div>
		</section>
	);
}
