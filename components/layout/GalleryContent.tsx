"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import AutoScroll from "embla-carousel-auto-scroll";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
	motion,
	useReducedMotion,
	useScroll,
	useTransform,
} from "motion/react";

import Instagram from "@/app/assets/icons/Instagram";
import Button from "../ui/Button";

type GalleryItem = {
	id: string;
	image: string;
	alt: string;
};

type GalleryContentProps = {
	lang: "fa" | "en";
	content: {
		title: string;
		previous: string;
		next: string;
		followInstagram: string;
		items: GalleryItem[];
	};
};

export default function GalleryContent({ lang, content }: GalleryContentProps) {
	const isRtl = lang === "fa";
	const stageRef = useRef<HTMLDivElement>(null);
	const reduceMotion = useReducedMotion();
	const [viewportWidth, setViewportWidth] = useState(1088);
	const autoScrollPlugin = useMemo(
		() =>
			AutoScroll({
				direction: "forward",
				speed: 0.8,
				startDelay: 0,
				playOnInit: !reduceMotion,
				stopOnInteraction: false,
				stopOnMouseEnter: false,
				stopOnFocusIn: false,
			}),
		[reduceMotion],
	);
	const [emblaRef, emblaApi] = useEmblaCarousel(
		{
			align: "start",
			direction: isRtl ? "rtl" : "ltr",
			loop: true,
			skipSnaps: true,
		},
		[autoScrollPlugin],
	);
	const { scrollYProgress } = useScroll({
		target: stageRef,
		offset: ["start end", "start start"],
	});
	const restingWidth = Math.min(1088, Math.max(0, viewportWidth - 48));
	const panelWidth = useTransform(
		scrollYProgress,
		[0, 0.25, 0.85],
		[
			reduceMotion ? viewportWidth : restingWidth,
			reduceMotion ? viewportWidth : restingWidth,
			viewportWidth,
		],
	);
	const restingRadius = viewportWidth < 768 ? 32 : 48;
	const cornerRadius = useTransform(
		scrollYProgress,
		[0, 0.55, 0.85],
		[reduceMotion ? 0 : restingRadius, reduceMotion ? 0 : restingRadius, 0],
	);

	useEffect(() => {
		const updateViewportWidth = () => {
			setViewportWidth(document.documentElement.clientWidth);
		};

		updateViewportWidth();
		window.addEventListener("resize", updateViewportWidth);

		return () => window.removeEventListener("resize", updateViewportWidth);
	}, []);

	const scrollPrevious = useCallback(
		() => emblaApi?.scrollPrev(),
		[emblaApi],
	);
	const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

	return (
		<section id="gallery" className="pt-24 md:pt-48 lg:pt-60">
			<div ref={stageRef} className="relative">
				<div className="overflow-hidden">
					<motion.div
						aria-hidden="true"
						className="pointer-events-none absolute inset-y-0 left-1/2 max-w-full -translate-x-1/2 bg-yellow-300"
						style={{
							width: panelWidth,
							borderRadius: cornerRadius,
						}}
					/>

					<div className="relative z-10 flex flex-col justify-center py-16 space-y-16 lg:py-48 lg:space-y-48">
						<div className="flex items-center justify-center w-full max-w-5xl mx-auto">
							<h2 className="px-1 text-heading-lg font-strong text-fg">
								{content.title}
							</h2>
						</div>

						<div
							ref={emblaRef}
							dir={isRtl ? "rtl" : "ltr"}
							aria-roledescription="carousel"
							aria-label={content.title}
							className="overflow-hidden"
						>
							<div className="-ml-3 flex touch-pan-y touch-pinch-zoom md:-ml-4 lg:-ml-8">
								{content.items.map((item, index) => (
									<article
										key={item.id}
										className="min-w-0 flex-[0_0_30%] pl-3 md:flex-[0_0_40%] md:pl-4 lg:flex-[0_0_20%] lg:pl-8"
										aria-roledescription="slide"
										aria-label={`${index + 1} / ${content.items.length}`}
									>
										<div className="relative aspect-2/3 overflow-hidden rounded-3xl md:rounded-4xl">
											<Image
												src={item.image}
												alt={item.alt}
												fill
												sizes="(max-width: 640px) 78vw, (max-width: 768px) 54vw, (max-width: 1024px) 42vw, 32vw"
												className="object-cover"
											/>
										</div>
									</article>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
