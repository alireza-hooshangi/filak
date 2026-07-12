"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
	ChevronLeft,
	ChevronRight,
	MenuIcon,
	XIcon,
} from "lucide-react";

import Logo from "@/components/branding/Logo";
import Button from "@/components/ui/Button";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import type { Locale } from "@/lib/i18n";

type NavigationItem = {
	key: string;
	href: string;
	label: string;
};

type MobileHeaderMenuProps = {
	lang: Locale;
	homeLabel: string;
	dashboardLabel: string;
	navigationItems: NavigationItem[];
};

export default function MobileHeaderMenu({
	lang,
	homeLabel,
	dashboardLabel,
	navigationItems,
}: MobileHeaderMenuProps) {
	const [isOpen, setIsOpen] = useState(false);
	const reduceMotion = useReducedMotion();

	useEffect(() => {
		if (!isOpen) return;

		const closeOnEscape = (event: KeyboardEvent) => {
			if (event.key === "Escape") setIsOpen(false);
		};

		window.addEventListener("keydown", closeOnEscape);

		return () => window.removeEventListener("keydown", closeOnEscape);
	}, [isOpen]);

	return (
		<div className="relative p-5 md:p-8 lg:hidden">
			<AnimatePresence>
				{isOpen && (
					<motion.div
						aria-hidden="true"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: reduceMotion ? 0 : 0.25 }}
						onClick={() => setIsOpen(false)}
						className="fixed inset-0 z-0 bg-black/30"
					/>
				)}
			</AnimatePresence>
			<motion.div
				initial={false}
				animate={{ height: isOpen ? "auto" : 80 }}
				transition={
					reduceMotion
						? { duration: 0 }
						: { duration: 0.45, ease: [0.22, 1, 0.36, 1] }
				}
				className="relative z-10 grid w-full items-start overflow-hidden rounded-[20px] bg-bg-secondary backdrop-blur-xl"
			>
				<div className="flex w-full justify-between items-center p-5">
					<Link
						href={`/${lang}`}
						aria-label={homeLabel}
						className="flex transition-opacity hover:opacity-80"
					>
						<Logo lang={lang} className="h-10 w-auto" />
					</Link>
					<Button
						lang={lang}
						size="md"
						color="secondary"
						variant="subtle"
						iconOnly
						type="button"
						onClick={() => setIsOpen((open) => !open)}
						aria-label={
							isOpen
								? "Close navigation menu"
								: "Open navigation menu"
						}
						aria-expanded={isOpen}
						aria-controls="mobile-navigation"
					>
						{isOpen ? (
							<XIcon className="h-5 w-5" />
						) : (
							<MenuIcon className="h-5 w-5" />
						)}
					</Button>
				</div>
				<AnimatePresence initial={false}>
					{isOpen && (
						<div className="grid max-h-[calc(100dvh-7.5rem)] min-h-0 grid-rows-[minmax(0,1fr)_auto] overflow-hidden">
							<nav
								id="mobile-navigation"
								aria-label="Primary navigation"
								dir={lang === "fa" ? "rtl" : "ltr"}
								className="min-h-0 overflow-y-auto border-t border-border-subtle px-5 scrollbar-none [&::-webkit-scrollbar]:hidden"
							>
								<ul className="grid grid-cols-1 divide-border-subtle divide-y">
									{navigationItems.map((item, index) => (
										<motion.li
											key={item.key}
											initial={{
												opacity: 0,
												y: reduceMotion ? 0 : 20,
											}}
											animate={{ opacity: 1, y: 0 }}
											transition={{
												delay: reduceMotion
													? 0
													: 0.18 + index * 0.04,
											}}
										>
											<Link
												href={item.href}
												onClick={() => setIsOpen(false)}
												className="grid w-full grid-cols-[1fr_auto] items-center py-4 text-body-sm font-strong text-fg transition-opacity hover:opacity-60"
											>
												{item.label}
												{lang === "fa" ? (
													<ChevronLeft
														aria-hidden="true"
														className="h-5 w-5"
													/>
												) : (
													<ChevronRight
														aria-hidden="true"
														className="h-5 w-5"
													/>
												)}
											</Link>
										</motion.li>
									))}
								</ul>
							</nav>
							<motion.div
								dir={lang == "fa" ? "ltr" : "rtl"}
								initial={{
									opacity: 0,
									y: reduceMotion ? 0 : 16,
								}}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: reduceMotion ? 0 : 0.35 }}
								className="flex items-center justify-between gap-3 p-5 border-t border-border-subtle"
							>
								<LanguageSwitcher lang={lang} />
								<Button lang={lang} size="md" href="/studio">
									{dashboardLabel}
								</Button>
							</motion.div>
						</div>
					)}
				</AnimatePresence>
			</motion.div>
		</div>
	);
}
