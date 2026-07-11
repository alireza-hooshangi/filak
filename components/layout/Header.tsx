import Link from "next/link";

import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import Logo from "@/components/branding/Logo";
import { getDictionary, type Locale } from "@/lib/i18n";
import Button from "../ui/Button";

type HeaderProps = {
	lang: Locale;
};

const navigationItems = [
	{
		key: "home",
		path: "",
	},
	{
		key: "ageGroups",
		path: "/age-groups",
	},
	{
		key: "facilities",
		path: "/facilities",
	},
	{
		key: "about",
		path: "/about",
	},
	{
		key: "gallery",
		path: "/gallery",
	},
	{
		key: "enroll",
		path: "/enroll",
	},
	{
		key: "contact",
		path: "/contact",
	},
] as const;

export default function Header({ lang }: HeaderProps) {
	const dictionary = getDictionary(lang);

	return (
		<header
			dir="ltr"
			className="fixed grid inset-x-0 top-0 z-50 py-6 px-12"
		>
			<div className="mx-auto w-full grid max-w-240 bg-nav p-3 rounded-[20px] grid-cols-[auto_1fr_auto] backdrop-blur-xl">
				<Link
					href={`/${lang}`}
					aria-label={dictionary.navigation.home}
					className="transition-opacity hover:opacity-80 flex items-center justify-center"
				>
					<Logo lang={lang} className="h-10 w-auto" />
				</Link>
				<nav aria-label="Primary navigation">
					<ul className="flex items-center gap-6 justify-between px-9">
						{navigationItems.map((item) => (
							<li key={item.key}>
								<Link
									href={`/${lang}${item.path}`}
									className={`transition-opacity flex leading-10 text-center hover:opacity-60 text-foreground ${lang === "fa" ? "font-bold text-xl" : "font-medium text-base"}`}
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
		</header>
	);
}
