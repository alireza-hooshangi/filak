import { Phone } from "lucide-react";

import Instagram from "@/app/assets/icons/Instagram";
import Telegram from "@/app/assets/icons/Telegram";
import WhatsApp from "@/app/assets/icons/WhatsApp";
import Button from "@/components/ui/Button";
import { getDictionary, type Locale } from "@/lib/i18n";

type ContactProps = {
	lang: Locale;
};

export default function Contact({ lang }: ContactProps) {
	const dictionary = getDictionary(lang);
	const contact = dictionary.contact;
	const contactDirection = lang === "fa" ? "rtl" : "ltr";

	return (
		<section id="contact" className="flex items-center px-6 md:px-8">
			<div className="mx-auto flex w-full max-w-5xl flex-col justify-between gap-12 lg:gap-48 rounded-[40px] bg-bg-tertiary px-8 py-12 md:p-12">
				<div className="grid gap-8 lg:grid-cols-2 md:gap-12">
					<div className="flex flex-col items-center justify-center lg:max-w-md space-y-3 md:space-y-4">
						<h2 className="text-heading-md w-full text-center md:text-start font-strong text-fg md:text-heading-lg md:leading-12">
							{contact.title}
						</h2>
						<p className="text-center md:text-start w-full text-body-sm md:text-body-md font-subtle text-fg">
							{contact.description}
						</p>
					</div>

					<div
						dir="ltr"
						className="grid content-start gap-3 sm:grid-cols-2"
					>
						<Button
							lang={lang}
							variant="outline"
							color="secondary"
							size="lg"
							type="button"
							target="_blank"
							href="#"
							dir={contactDirection}
							justify="between"
							className="w-full gap-4 pr-4 pl-4"
						>
							{contact.telegram}
							<Telegram className="h-5 w-5 shrink-0 mt-px" />
						</Button>
						<Button
							lang={lang}
							variant="outline"
							color="secondary"
							size="lg"
							target="_blank"
							href="https://wa.me/983136412417"
							dir={contactDirection}
							justify="between"
							className="w-full gap-4 pr-4 pl-4"
						>
							{contact.whatsapp}
							<WhatsApp className="h-5 w-5 shrink-0 mt-px" />
						</Button>
						<Button
							lang={lang}
							variant="outline"
							color="secondary"
							size="lg"
							type="button"
							target="_blank"
							href="https://www.instagram.com/filakkindergartenn"
							dir={contactDirection}
							justify="between"
							className="w-full gap-4 pr-4 pl-4"
						>
							{contact.instagram}
							<Instagram className="h-5 w-5 shrink-0 mt-px" />
						</Button>
						<Button
							lang={lang}
							variant="outline"
							color="secondary"
							size="lg"
							href="tel:+983136412417"
							target="_blank"
							dir={contactDirection}
							justify="between"
							className="w-full gap-4 pr-4 pl-4"
						>
							<span dir="ltr">{contact.phone}</span>
							<Phone className="h-5 w-5 shrink-0 mt-px" />
						</Button>
					</div>
				</div>

				<p className="flex justify-center md:justify-start flex-wrap items-center gap-3 text-body-sm md:text-body-md font-subtle text-fg-subtle">
					<span>{contact.hours}</span>
					<span
						className="size-1 rounded-full bg-current"
						aria-hidden="true"
					/>
					<span>{contact.days}</span>
				</p>
			</div>
		</section>
	);
}
