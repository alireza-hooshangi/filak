import Link from "next/link";

import Instagram from "@/app/assets/icons/Instagram";
import Telegram from "@/app/assets/icons/Telegram";
import WhatsApp from "@/app/assets/icons/WhatsApp";
import { getDictionary, type Locale } from "@/lib/i18n";

import Button from "../ui/Button";

type FooterProps = {
	lang: Locale;
};

const pageLinks = [
	{
		key: "home",
		sectionId: "home",
	},
	{
		key: "ageGroups",
		sectionId: "age-groups",
	},
	{
		key: "about",
		sectionId: "about",
	},
	{
		key: "gallery",
		sectionId: "gallery",
	},
	{
		key: "enroll",
		sectionId: "enroll",
	},
	{
		key: "contact",
		sectionId: "contact",
	},
] as const;

const facilityItems = [
	"qualifiedStaff",
	"safetyMonitoring",
	"artCreativity",
	"indoorPlayroom",
	"outdoorPlayground",
	"kitchenDining",
	"restArea",
	"labLibrary",
	"storytellingHall",
	"mediaRoom",
] as const;

export default function Footer({ lang }: FooterProps) {
	const dictionary = getDictionary(lang);
	const footer = dictionary.footer;

	return (
		<footer className="px-12 pt-60">
			<div className="mx-auto grid max-w-240 gap-60">
				<div className="grid grid-cols-[1fr_1fr_auto] items-start gap-12">
					{/* Pages */}
					<div className="flex flex-col gap-2">
						<h2
							className={`inline-flex leading-7 ${
								lang === "fa"
									? "text-xl font-bold"
									: "text-base font-semibold"
							}`}
						>
							{footer.pagesTitle}
						</h2>

						<nav aria-label={footer.pagesTitle}>
							<ul className="flex flex-col gap-2">
								{pageLinks.map((item) => (
									<li key={item.key}>
										<Link
											href={`/${lang}#${item.sectionId}`}
											className={`inline-flex leading-7 text-gray-800 transition-opacity hover:opacity-60 ${
												lang === "fa"
													? "text-xl font-normal"
													: "text-base font-light"
											}`}
										>
											{dictionary.navigation[item.key]}
										</Link>
									</li>
								))}
							</ul>
						</nav>
					</div>

					{/* Facilities */}
					<div className="flex flex-col gap-2">
						<h2
							className={`inline-flex leading-7 ${
								lang === "fa"
									? "text-xl font-bold"
									: "text-base font-semibold"
							}`}
						>
							{footer.facilitiesTitle}
						</h2>

						<ul className="flex flex-col gap-2">
							{facilityItems.map((item) => (
								<li key={item}>
									<button
										type="button"
										className={`inline-flex cursor-pointer appearance-none border-0 bg-transparent p-0 leading-7 text-gray-800 transition-opacity hover:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-800 focus-visible:ring-offset-2 ${
											lang === "fa"
												? "text-right text-xl font-normal"
												: "text-left text-base font-light"
										}`}
									>
										{footer.facilities[item]}
									</button>
								</li>
							))}
						</ul>
					</div>

					{/* Actions */}
					<div className="flex flex-col items-end gap-8">
						<Button
							lang={lang}
							size="lg"
							href={`/${lang}/studio`}
							className="w-full"
						>
							{dictionary.navigation.dashboard}
						</Button>
						<div className="flex gap-4">
							<Button
								lang={lang}
								iconOnly
								color="tertiary"
								size="md"
								href="#"
								aria-label="Instagram"
							>
								<Instagram className="h-4 w-4" />
							</Button>
							<Button
								lang={lang}
								iconOnly
								color="tertiary"
								size="md"
								href="#"
								aria-label="Telegram"
							>
								<Telegram className="h-4 w-4" />
							</Button>
							<Button
								lang={lang}
								iconOnly
								color="tertiary"
								size="md"
								href="#"
								aria-label="WhatsApp"
							>
								<WhatsApp className="h-4 w-4" />
							</Button>
						</div>
					</div>
				</div>

				{/* Bottom */}
				<div className="grid grid-cols-[1fr_auto] border-t border-black/5 py-12 gap-12">
					<p
						className={`flex items-center gap-3 ${lang === "fa" ? "text-xl font-normal" : "text-base font-light"}`}
					>
						<span>{footer.address.name}</span>
						<span
							className="w-1 h-1 rounded-full bg-gray-800"
							aria-hidden="true"
						/>
						<span>{footer.address.location}</span>
						<span
							className="w-1 h-1 rounded-full bg-gray-800"
							aria-hidden="true"
						/>
						<a
							href="tel:+983136412417"
							dir="ltr"
							className={`inline-block transition-opacity hover:opacity-60`}
						>
							{footer.address.phone}
						</a>
					</p>
					<p
						className={`${lang === "fa" ? "text-xl font-normal" : "text-base font-light"}`}
					>
						{footer.rights}
					</p>
				</div>
			</div>
		</footer>
	);
}
