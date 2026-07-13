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
		<footer className="px-6 md:px-8 pt-24 md:pt-60">
			<div className="mx-auto grid max-w-5xl gap-12 md:gap-60">
				<div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] justify-start items-start gap-12">
					{/* Pages */}
					<div className="flex flex-col items-center md:items-start gap-2">
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
							<ul className="flex flex-col items-center md:items-start gap-2">
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
					<div className="flex flex-col items-center md:items-start gap-2">
						<h2
							className={`inline-flex leading-7 ${
								lang === "fa"
									? "text-xl font-bold"
									: "text-base font-semibold"
							}`}
						>
							{footer.facilitiesTitle}
						</h2>

						<ul className="flex flex-col items-center md:items-start gap-2">
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
					<div className="grid w-fit grid-cols-3 justify-self-center gap-x-3 gap-y-3 md:justify-self-end md:gap-x-4">
						<Button
							lang={lang}
							size="lg"
							href={`/${lang}/studio`}
							className="col-span-3 w-full"
						>
							{dictionary.navigation.dashboard}
						</Button>
						<div className="contents">
							<Button
								lang={lang}
								iconOnly
								color="tertiary"
								size="md"
								href="#"
								aria-label="Instagram"
							>
								<Instagram className="h-5 w-5" />
							</Button>
							<Button
								lang={lang}
								iconOnly
								color="tertiary"
								size="md"
								href="#"
								aria-label="Telegram"
							>
								<Telegram className="h-5 w-5" />
							</Button>
							<Button
								lang={lang}
								iconOnly
								color="tertiary"
								size="md"
								href="#"
								aria-label="WhatsApp"
							>
								<WhatsApp className="h-5 w-5" />
							</Button>
						</div>
					</div>
				</div>

				{/* Bottom */}
				<div className="grid justify-center md:grid-cols-[1fr_auto] border-t border-black/5 py-12 gap-8 md:gap-12">
					<p
						className={`flex flex-col md:flex-row items-center md:gap-3 text-body-sm font-subtle`}
					>
						<span>{footer.address.name}</span>
						<span
							className="w-1 h-1 hidden md:block rounded-full bg-gray-800"
							aria-hidden="true"
						/>
						<span>{footer.address.location}</span>
						<span
							className="w-1 h-1 hidden md:block rounded-full bg-gray-800"
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
					<p className={`text-center text-body-sm font-subtle`}>
						{footer.rights}
					</p>
				</div>
			</div>
		</footer>
	);
}
