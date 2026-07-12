"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, MenuIcon, XIcon } from "lucide-react";

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

		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";

		const closeOnEscape = (event: KeyboardEvent) => {
			if (event.key === "Escape") setIsOpen(false);
		};

		window.addEventListener("keydown", closeOnEscape);

		return () => {
			document.body.style.overflow = previousOverflow;
			window.removeEventListener("keydown", closeOnEscape);
		};
	}, [isOpen]);

	return (
		<div className="p-5 lg:hidden">
			<div className="flex w-full items-center justify-between rounded-full border border-border-subtle p-2 backdrop-blur-xl">
				<Link
					href={`/${lang}`}
					aria-label={homeLabel}
					className="flex transition-opacity hover:opacity-80"
				>
					<Logo lang={lang} className="h-8 w-auto" />
				</Link>
				<Button
					lang={lang}
					size="sm"
					color="secondary"
					variant="subtle"
					iconOnly
					radius="full"
					type="button"
					onClick={() => setIsOpen(true)}
					aria-label="Open navigation menu"
					aria-expanded={isOpen}
					aria-controls="mobile-navigation"
				>
					<MenuIcon className="h-5 w-5" />
				</Button>
			</div>

			<AnimatePresence>
				{isOpen && (
					<motion.div
						id="mobile-navigation"
						role="dialog"
						aria-modal="true"
						aria-label="Mobile navigation"
						initial={
							reduceMotion
								? { opacity: 0 }
								: {
										clipPath:
											"circle(0 at calc(100% - 40px) 40px)",
									}
						}
						animate={
							reduceMotion
								? { opacity: 1 }
								: {
										clipPath:
											"circle(150vmax at calc(100% - 40px) 40px)",
									}
						}
						exit={
							reduceMotion
								? { opacity: 0 }
								: {
										clipPath:
											"circle(0 at calc(100% - 40px) 40px)",
									}
						}
						transition={{
							duration: reduceMotion ? 0.15 : 0.55,
							ease: [0.76, 0, 0.24, 1],
						}}
						className="fixed inset-0 z-10 grid min-h-dvh"
					>
						<div className="grid grid-rows-[auto_1fr_auto] items-start bg-violet-300 p-7">
							<div className="flex items-center justify-between">
								<Link
									href={`/${lang}`}
									aria-label={homeLabel}
									onClick={() => setIsOpen(false)}
									className="flex"
								>
									<Logo lang={lang} className="h-8 w-auto" />
								</Link>
								<Button
									lang={lang}
									size="sm"
									color="secondary"
									iconOnly
									radius="full"
									type="button"
									onClick={() => setIsOpen(false)}
									aria-label="Close navigation menu"
									autoFocus
								>
									<XIcon className="h-5 w-5" />
								</Button>
							</div>

							<nav
								aria-label="Primary navigation"
								dir={lang === "fa" ? "rtl" : "ltr"}
								className="flex flex-col justify-center h-full"
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
												className="grid w-full grid-cols-[1fr_auto] items-center py-4 text-heading-md font-strong text-fg transition-opacity hover:opacity-60"
											>
												{item.label}
												{lang === "fa" ? (
													<ArrowLeft
														aria-hidden="true"
														className="h-8 w-8"
													/>
												) : (
													<ArrowRight
														aria-hidden="true"
														className="h-8 w-8"
													/>
												)}
											</Link>
										</motion.li>
									))}
								</ul>
							</nav>

							<motion.div
								initial={{
									opacity: 0,
									y: reduceMotion ? 0 : 16,
								}}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: reduceMotion ? 0 : 0.35 }}
								className="flex items-center justify-between gap-3 pb-[max(0px,env(safe-area-inset-bottom))]"
							>
								<LanguageSwitcher lang={lang} />
								<Button
									lang={lang}
									size="md"
									href="/studio"
									className=""
								>
									{dashboardLabel}
								</Button>
							</motion.div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
