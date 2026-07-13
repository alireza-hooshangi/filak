import { CalendarDays } from "lucide-react";

import { getDictionary, type Locale } from "@/lib/i18n";

import Button from "../ui/Button";

type EnrollProps = {
	lang: Locale;
};

export default function Enroll({ lang }: EnrollProps) {
	const dictionary = getDictionary(lang);

	return (
		<section
			id="enroll"
			className="flex h-screen items-center justify-center px-6"
		>
			<div className="flex max-w-4xl flex-col items-center gap-12 text-center md:gap-16">
				<h2 className="text-heading-md font-strong text-fg md:text-heading-lg">
					{dictionary.enroll.title}
				</h2>

				<Button
					lang={lang}
					color="secondary"
					size="lg"
					href="tel:+983136412417"
					dir="ltr"
					className="gap-4 pl-4"
				>
					<CalendarDays className="h-6 w-6" aria-hidden="true" />
					{dictionary.enroll.action}
				</Button>
			</div>
		</section>
	);
}
