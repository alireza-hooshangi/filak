"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight, Plus } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Button from "../ui/Button";

type Facility = {
	id: string;
	label: string;
	description: string;
};

type FacilitiesContentProps = {
	lang: "fa" | "en";
	content: {
		title: string;
		previous: string;
		next: string;
		close: string;
		openDetails: string;
		items: Facility[];
	};
};

const facilityImage = "/images/facilities/placeholder.png";

export default function FacilitiesContent({
	lang,
	content,
}: FacilitiesContentProps) {
	const isRtl = lang === "fa";
	const [emblaRef, emblaApi] = useEmblaCarousel({
		align: "start",
		direction: isRtl ? "rtl" : "ltr",
		loop: false,
		skipSnaps: false,
	});
	const [activeFacility, setActiveFacility] = useState<Facility | null>(null);
	const triggerRef = useRef<HTMLButtonElement | null>(null);
	const closeButtonRef = useRef<HTMLButtonElement>(null);
	const reduceMotion = useReducedMotion();

	const scrollPrevious = useCallback(
		() => emblaApi?.scrollPrev(),
		[emblaApi],
	);
	const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

	const openFacility = (facility: Facility, trigger: HTMLButtonElement) => {
		triggerRef.current = trigger;
		setActiveFacility(facility);
	};

	const closeDialog = () => {
		setActiveFacility(null);
	};

	useEffect(() => {
		if (!activeFacility) return;

		const focusFrame = requestAnimationFrame(() => {
			closeButtonRef.current?.focus();
		});

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") closeDialog();
			if (event.key === "Tab") {
				event.preventDefault();
				closeButtonRef.current?.focus();
			}
		};

		document.addEventListener("keydown", handleKeyDown);

		return () => {
			cancelAnimationFrame(focusFrame);
			document.removeEventListener("keydown", handleKeyDown);
			triggerRef.current?.focus();
		};
	}, [activeFacility]);

	return (
		<section id="facilities" className="pt-24 lg:pt-60 px-6 md:px-8">
			<div className={`mx-auto w-full max-w-5xl`}>
				<div className="flex items-center justify-between pb-5 md:pb-8 lg:pb-16">
					<h2 className="text-heading-lg font-strong text-fg px-1">
						{content.title}
					</h2>
					<div className="flex gap-2 md:gap-3">
						<Button
							lang={lang}
							iconOnly
							variant="subtle"
							color="secondary"
							size={{ base: "md", md: "lg" }}
							radius="full"
							onClick={scrollPrevious}
							aria-label={content.previous}
						>
							{isRtl ? (
								<ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
							) : (
								<ArrowLeft className="h-4 w-4 md:h-5 md:w-5" />
							)}
						</Button>
						<Button
							lang={lang}
							iconOnly
							variant="subtle"
							color="secondary"
							size={{ base: "md", md: "lg" }}
							radius="full"
							onClick={scrollNext}
							aria-label={content.next}
						>
							{isRtl ? (
								<ArrowLeft className="h-4 w-4 md:h-5 md:w-5" />
							) : (
								<ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
							)}
						</Button>
					</div>
				</div>

				<div
					ref={emblaRef}
					dir={isRtl ? "rtl" : "ltr"}
					aria-roledescription="carousel"
					aria-label={content.title}
				>
					<div className="flex touch-pan-y touch-pinch-zoom -ml-3 md:-ml-4 lg:-ml-8">
						{content.items.map((facility, index) => (
							<article
								key={facility.id}
								className="min-w-0 flex-[0_0_75%] md:flex-[0_0_40%] lg:flex-[0_0_calc(100%/3)] pl-3 md:pl-4 lg:pl-8 flex flex-col space-y-5 md:space-y-8"
								aria-roledescription="slide"
								aria-label={`${index + 1} / ${content.items.length}`}
							>
								<div className="relative aspect-4/5 overflow-hidden rounded-3xl md:rounded-4xl">
									<Image
										src={facilityImage}
										alt=""
										fill
										sizes="(max-width: 640px) 78vw, (max-width: 768px) 54vw, (max-width: 1024px) 42vw, 32vw"
										className="object-cover"
									/>
								</div>

								<div className="flex items-start gap-4">
									<Button
										lang={lang}
										iconOnly
										color="secondary"
										variant="subtle"
										size="sm"
										radius="full"
										onClick={(event) =>
											openFacility(
												facility,
												event.currentTarget,
											)
										}
										aria-label={`${content.openDetails}: ${facility.label}`}
									>
										<Plus className="h-4 w-4" />
									</Button>
									<h3 className="text-heading-sm font-strong text-fg">
										{facility.label}
									</h3>
								</div>
							</article>
						))}
					</div>
				</div>
			</div>

			<AnimatePresence>
				{activeFacility && (
					<motion.div
						className="fixed inset-0 z-100 bg-black/40"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: reduceMotion ? 0 : 0.4 }}
						onClick={closeDialog}
					/>
				)}
			</AnimatePresence>

			<AnimatePresence>
				{activeFacility && (
					<motion.div
						className="pointer-events-none fixed inset-0 z-101 flex items-end justify-center overscroll-none p-5 md:p-8"
						initial={{ y: reduceMotion ? 0 : "100%" }}
						animate={{ y: 0 }}
						exit={{ y: reduceMotion ? 0 : "100%" }}
						transition={{
							duration: reduceMotion ? 0 : 0.4,
							ease: [0.76, 0, 0.24, 1],
						}}
					>
						<div
							dir={isRtl ? "rtl" : "ltr"}
							role="dialog"
							aria-modal="true"
							aria-labelledby="facility-dialog-title"
							aria-describedby="facility-dialog-description"
							className="pointer-events-auto flex justify-between max-h-[calc(100dvh-40px)] w-full max-w-5xl gap-6 overflow-y-auto overscroll-contain rounded-4xl bg-zinc-800 p-6 text-fg scrollbar-none [&::-webkit-scrollbar]:hidden md:max-h-[calc(100dvh-64px)] md:p-8"
						>
							<header className="flex flex-col justify-between max-w-md w-full gap-8 md:gap-12">
								<h3
									id="facility-dialog-title"
									className="text-heading-sm md:text-heading-md font-strong text-bg"
								>
									{activeFacility.label}
								</h3>
								<p
									id="facility-dialog-description"
									className="text-body-sm md:text-body-md font-subtle text-bg/80"
								>
									{activeFacility.description}
								</p>
							</header>
							<div className="relative aspect-4/5 max-w-24 min-h-full w-full md:max-w-48 overflow-hidden rounded-2xl">
								<Image
									src={facilityImage}
									alt=""
									fill
									sizes="(max-width: 768px) calc(100vw - 80px), 384px"
									className="object-cover"
								/>
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</section>
	);
}
