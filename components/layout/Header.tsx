import Link from "next/link";

import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import Logo from "@/components/branding/Logo";
import MobileHeaderMenu from "@/components/layout/MobileHeaderMenu";
import { getDictionary, type Locale } from "@/lib/i18n";
import Button from "../ui/Button";

type HeaderProps = {
	lang: Locale;
};

const navigationItems = [
	{
		key: "home",
		path: "/",
	},
	{
		key: "ageGroups",
		path: "#age-groups",
	},
	{
		key: "facilities",
		path: "#facilities",
	},
	{
		key: "about",
		path: "#about",
	},
	{
		key: "gallery",
		path: "#gallery",
	},
	{
		key: "enroll",
		path: "#enroll",
	},
	{
		key: "contact",
		path: "#contact",
	},
] as const;

export default function Header({ lang }: HeaderProps) {
	const dictionary = getDictionary(lang);

	return (
		<header
			dir="ltr"
			className="fixed inset-x-0 top-0 z-50 pointer-events-none"
		>
			<MobileHeaderMenu
				lang={lang}
				homeLabel={dictionary.navigation.home}
				dashboardLabel={dictionary.navigation.dashboard}
				navigationItems={navigationItems.map((item) => ({
					key: item.key,
					href: `/${lang}${item.path}`,
					label: dictionary.navigation[item.key],
				}))}
			/>

			<div className="hidden p-8 lg:block pointer-events-none">
				<div className="mx-auto grid w-full max-w-5xl grid-cols-[auto_1fr_auto] rounded-[20px] bg-bg-secondary p-5 pointer-events-auto">
					<Link
						href={`/${lang}`}
						aria-label={dictionary.navigation.home}
						className="flex items-center justify-center transition-opacity hover:opacity-80"
					>
						<Logo lang={lang} className="h-10 w-auto" />
					</Link>
					<nav aria-label="Primary navigation">
						<ul
							dir={lang === "fa" ? "rtl" : "ltr"}
							className="flex items-center justify-center gap-6 px-5"
						>
							{navigationItems.map((item) => (
								<li key={item.key}>
									<Link
										href={`/${lang}${item.path}`}
										className={`flex text-center leading-10 text-foreground transition-opacity truncate hover:opacity-60 ${lang === "fa" ? "text-xl font-bold" : "text-base font-medium"}`}
									>
										{dictionary.navigation[item.key]}
									</Link>
								</li>
							))}
						</ul>
					</nav>
					<div className="flex items-center gap-3">
						<LanguageSwitcher lang={lang} />
						<Button
							lang={lang}
							size="md"
							href="/studio"
							className="w-30"
						>
							{dictionary.navigation.dashboard}
						</Button>
					</div>
				</div>
			</div>
		</header>
	);
}
