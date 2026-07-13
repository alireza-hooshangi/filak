"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import {
	AnimatePresence,
	LayoutGroup,
	motion,
	useReducedMotion,
} from "motion/react";

type GalleryItem = {
	id: string;
	image: string;
	alt: string;
};

type GalleryContentProps = {
	content: {
		title: string;
		open: string;
		enlarge: string;
		close: string;
		items: GalleryItem[];
	};
};

const stackTransforms = [
	{ x: -32, y: 14, rotate: -10 },
	{ x: 30, y: 12, rotate: 9 },
	{ x: -22, y: 4, rotate: -7 },
	{ x: 23, y: 2, rotate: 6 },
	{ x: -14, y: -5, rotate: -4 },
	{ x: 15, y: -7, rotate: 4 },
	{ x: -7, y: -11, rotate: -2 },
	{ x: 8, y: -13, rotate: 2 },
	{ x: -5, y: -15, rotate: -1.5 },
	{ x: 6, y: -17, rotate: 1.5 },
	{ x: -3, y: -19, rotate: -1 },
	{ x: 0, y: -21, rotate: 0 },
];

export default function GalleryContent({
	content,
}: GalleryContentProps) {
	const items = content.items.slice(0, 12);
	const [isGridOpen, setIsGridOpen] = useState(false);
	const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);
	const closeButtonRef = useRef<HTMLButtonElement>(null);
	const lightboxTriggerRef = useRef<HTMLButtonElement | null>(null);
	const reduceMotion = useReducedMotion();

	useEffect(() => {
		if (!activeItem) return;

		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";

		const focusFrame = requestAnimationFrame(() => {
			closeButtonRef.current?.focus();
		});
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") setActiveItem(null);

			if (event.key === "Tab") {
				event.preventDefault();
				closeButtonRef.current?.focus();
			}
		};

		document.addEventListener("keydown", handleKeyDown);

		return () => {
			cancelAnimationFrame(focusFrame);
			document.body.style.overflow = previousOverflow;
			document.removeEventListener("keydown", handleKeyDown);
			lightboxTriggerRef.current?.focus();
		};
	}, [activeItem]);

	const openLightbox = (item: GalleryItem, trigger: HTMLButtonElement) => {
		lightboxTriggerRef.current = trigger;
		setActiveItem(item);
	};

	return (
		<LayoutGroup id="gallery-layout">
			<section
				id="gallery"
				className="flex min-h-screen items-center px-6 py-24 md:px-8 md:py-48"
			>
				<div className="w-full">
					<h2 className="text-center text-heading-lg font-strong text-fg">
						{content.title}
					</h2>

					<div
						className={
							isGridOpen
								? "grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-8"
								: "group relative mx-auto mt-20 h-[min(55vh,30rem)] w-[min(68vw,21rem)] md:mt-24"
						}
					>
						{items.map((item, index) => {
							const isTopCard = index === items.length - 1;

							return (
								<motion.button
									key={item.id}
									layout
									type="button"
									tabIndex={
										!isGridOpen && !isTopCard ? -1 : 0
									}
									aria-hidden={!isGridOpen && !isTopCard}
									aria-label={
										isGridOpen
											? `${content.enlarge}: ${item.alt}`
											: isTopCard
												? content.open
												: undefined
									}
									onClick={(event) => {
										if (!isGridOpen) {
											setIsGridOpen(true);
											return;
										}

										openLightbox(item, event.currentTarget);
									}}
									initial={
										reduceMotion
											? false
											: { opacity: 0, scale: 0.9, y: 36 }
									}
									animate={
										isGridOpen
											? {
													x: 0,
													y: 0,
													rotate: 0,
													opacity: 1,
													scale: 1,
												}
											: {
													...stackTransforms[index],
													opacity: 1,
													scale: 1,
												}
									}
									whileHover={
										reduceMotion
											? undefined
											: isGridOpen
												? { scale: 1.025 }
												: isTopCard
													? { y: -24, scale: 1.025 }
													: undefined
									}
									transition={{
										duration: reduceMotion
											? 0
											: isGridOpen
												? 0.7
												: 0.55,
										delay:
											reduceMotion || isGridOpen
												? 0
												: index * 0.045,
										ease: [0.22, 1, 0.36, 1],
									}}
									className={`overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-800 focus-visible:ring-offset-4 aspect-2/3 ${
										isGridOpen
											? "relative rounded-xl sm:rounded-2xl md:rounded-4xl"
											: "absolute inset-0 rounded-3xl shadow-xl md:rounded-4xl"
									}`}
									style={{
										zIndex: isGridOpen
											? undefined
											: index + 1,
									}}
								>
									<Image
										src={item.image}
										alt={isGridOpen ? item.alt : ""}
										fill
										sizes={
											isGridOpen
												? "(max-width: 768px) 33vw, 320px"
												: "(max-width: 768px) 68vw, 336px"
										}
										className="object-cover"
									/>
								</motion.button>
							);
						})}

						{!isGridOpen && (
							<span className="pointer-events-none absolute inset-x-4 -bottom-16 z-20 text-center text-body-sm font-strong text-fg transition-opacity group-hover:opacity-60">
								{content.open}
							</span>
						)}
					</div>
				</div>
			</section>

			<AnimatePresence>
				{activeItem && (
					<motion.div
						role="dialog"
						aria-modal="true"
						aria-label={activeItem.alt}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: reduceMotion ? 0 : 0.3 }}
						onClick={() => setActiveItem(null)}
						className="fixed inset-0 z-100 flex items-center justify-center bg-black/80 p-5 md:p-8"
					>
						<button
							ref={closeButtonRef}
							type="button"
							aria-label={content.close}
							onClick={() => setActiveItem(null)}
							className="absolute inset-e-5 top-5 z-10 flex size-12 items-center justify-center rounded-full bg-white text-gray-800 transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black md:inset-e-8 md:top-8"
						>
							<X className="h-5 w-5" />
						</button>

						<motion.div
							initial={{ scale: reduceMotion ? 1 : 0.92 }}
							animate={{ scale: 1 }}
							exit={{ scale: reduceMotion ? 1 : 0.96 }}
							transition={{
								duration: reduceMotion ? 0 : 0.4,
								ease: [0.22, 1, 0.36, 1],
							}}
							onClick={(event) => event.stopPropagation()}
							className="relative h-[85dvh] w-full max-w-5xl"
						>
							<Image
								src={activeItem.image}
								alt={activeItem.alt}
								fill
								sizes="100vw"
								className="object-contain"
							/>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</LayoutGroup>
	);
}
