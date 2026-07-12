"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Button from "../ui/Button";

type AgeGroup = {
	id: string;
	label: string;
	age: string;
	description: string;
};

type AgeGroupsContentProps = {
	lang: "fa" | "en";
	content: {
		title: string;
		intro: string[];
		previous: string;
		next: string;
		groups: AgeGroup[];
	};
};

const images: Record<string, string> = {
	infants: "/images/age-groups/infants.png",
	toddlers: "/images/age-groups/toddlers.png",
	littleExplorers: "/images/age-groups/little-explorers.png",
	preschoolOne: "/images/age-groups/preschool-one.png",
	preschoolTwo: "/images/age-groups/preschool-two.png",
};

export default function AgeGroupsContent({
	lang,
	content,
}: AgeGroupsContentProps) {
	const [activeIndex, setActiveIndex] = useState(0);
	const [direction, setDirection] = useState(1);
	const reduceMotion = useReducedMotion();

	const activeGroup = content.groups[activeIndex];
	const isRtl = lang === "fa";

	const selectGroup = (index: number) => {
		if (index === activeIndex) return;

		setDirection(index > activeIndex ? 1 : -1);
		setActiveIndex(index);
	};

	const previousGroup = () => {
		setDirection(-1);
		setActiveIndex(
			(current) =>
				(current - 1 + content.groups.length) % content.groups.length,
		);
	};

	const nextGroup = () => {
		setDirection(1);
		setActiveIndex((current) => (current + 1) % content.groups.length);
	};

	const visualDirection = direction * (isRtl ? -1 : 1);

	const panelVariants = {
		enter: (movement: number) => ({
			opacity: 0,
			x: reduceMotion ? 0 : movement * 40,
		}),
		center: {
			opacity: 1,
			x: 0,
		},
		exit: (movement: number) => ({
			opacity: 0,
			x: reduceMotion ? 0 : movement * -40,
		}),
	};

	return (
		<section id="age-groups" className="px-5 pt-24 lg:px-12 lg:pt-60">
			<div className="mx-auto max-w-240">
				{/* Desktop */}
				<div className="hidden rounded-[48px] bg-bg-secondary border border-border p-12 lg:block">
					<header>
						<h2 className={`text-fg text-heading-lg font-strong`}>
							{content.title}
						</h2>

						<div className="mt-14 max-w-6xl space-y-7 text-body-sm font-subtle text-fg">
							{content.intro.map((paragraph) => (
								<p key={paragraph}>{paragraph}</p>
							))}
						</div>
					</header>

					<div className="my-14 h-px bg-border" />

					<div className="flex items-center justify-between gap-8">
						<div
							role="tablist"
							aria-label={content.title}
							className="flex flex-wrap gap-3"
						>
							{content.groups.map((group, index) => {
								const active = index === activeIndex;

								return (
									<button
										key={group.id}
										type="button"
										role="tab"
										id={`age-tab-${group.id}`}
										aria-selected={active}
										aria-controls={`age-panel-${group.id}`}
										onClick={() => selectGroup(index)}
										className={`relative rounded-[10px] border px-4 h-10 text-body-sm font-strong transition-colors ${
											active
												? "border-transparent text-bg-secondary"
												: "border-border text-fg hover:bg-bg"
										}`}
									>
										{active && (
											<motion.span
												layoutId="active-age-group-tab"
												className="absolute inset-0 rounded-[10px] bg-fg"
												transition={{
													type: "spring",
													stiffness: 450,
													damping: 35,
												}}
											/>
										)}

										<span className="relative z-10">
											{group.label}
										</span>
									</button>
								);
							})}
						</div>

						<div className="flex shrink-0 gap-3">
							<Button
								lang={lang}
								iconOnly
								variant="subtle"
								color="secondary"
								size="md"
								radius="full"
								onClick={previousGroup}
								aria-label={content.previous}
								className="transition-opacity hover:opacity-70"
							>
								{isRtl ? (
									<ArrowRight className="w-4 h-4" />
								) : (
									<ArrowLeft className="w-4 h-4" />
								)}
							</Button>

							<Button
								lang={lang}
								iconOnly
								variant="subtle"
								color="secondary"
								size="md"
								radius="full"
								onClick={nextGroup}
								aria-label={content.next}
								className="transition-opacity hover:opacity-70"
							>
								{isRtl ? (
									<ArrowLeft className="w-4 h-4" />
								) : (
									<ArrowRight className="w-4 h-4" />
								)}
							</Button>
						</div>
					</div>

					<div className="mt-24 overflow-hidden">
						<AnimatePresence
							initial={false}
							mode="wait"
							custom={visualDirection}
						>
							<motion.article
								key={activeGroup.id}
								id={`age-panel-${activeGroup.id}`}
								role="tabpanel"
								aria-labelledby={`age-tab-${activeGroup.id}`}
								custom={visualDirection}
								variants={panelVariants}
								initial="enter"
								animate="center"
								exit="exit"
								transition={{
									duration: reduceMotion ? 0 : 0.35,
									ease: [0.22, 1, 0.36, 1],
								}}
								className="grid grid-cols-2 items-end gap-20"
							>
								<div>
									<h3 className="text-2xl font-bold text-fg">
										{activeGroup.label}
									</h3>

									<p className="mt-3 font-semibold text-fg-subtle">
										{activeGroup.age}
									</p>

									<p className="mt-20 max-w-xl text-lg leading-8 text-fg">
										{activeGroup.description}
									</p>
								</div>

								<div className="relative aspect-square overflow-hidden rounded-3xl">
									<Image
										src={images[activeGroup.id]}
										alt=""
										fill
										sizes="40vw"
										className="object-cover"
									/>
								</div>
							</motion.article>
						</AnimatePresence>
					</div>
				</div>

				{/* Mobile */}
				<div className="space-y-5 lg:hidden">
					{content.groups.map((group) => (
						<article
							key={group.id}
							className="rounded-4xl bg-bg-secondary p-8"
						>
							<h3 className="text-xl font-bold text-fg">
								{group.label}
							</h3>

							<p className="mt-3 font-semibold text-fg-subtle">
								{group.age}
							</p>

							<p className="mt-12 leading-7 text-fg">
								{group.description}
							</p>
						</article>
					))}
				</div>
			</div>
		</section>
	);
}
