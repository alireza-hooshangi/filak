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
	const reduceMotion = useReducedMotion();

	const activeGroup = content.groups[activeIndex];
	const isRtl = lang === "fa";
	const leadIntro = content.intro.slice(0, -1);
	const supportingIntro = content.intro.at(-1);

	const selectGroup = (index: number) => {
		if (index === activeIndex) return;

		setActiveIndex(index);
	};

	const previousGroup = () => {
		setActiveIndex(
			(current) =>
				(current - 1 + content.groups.length) % content.groups.length,
		);
	};

	const nextGroup = () => {
		setActiveIndex((current) => (current + 1) % content.groups.length);
	};

	const panelVariants = {
		enter: {
			opacity: 0,
			y: reduceMotion ? 0 : 12,
			scale: reduceMotion ? 1 : 0.99,
		},
		center: {
			opacity: 1,
			y: 0,
			scale: 1,
		},
		exit: {
			opacity: 0,
			y: reduceMotion ? 0 : -6,
			scale: reduceMotion ? 1 : 0.995,
		},
	};

	return (
		<section id="age-groups" className="px-6 pt-24 md:px-8 lg:pt-60">
			<div className="mx-auto max-w-5xl">
				{/* Desktop */}
				<div className="hidden md:flex flex-col rounded-4xl lg:rounded-[48px] bg-bg-tertiary px-8 lg:px-12">
					<header className="flex flex-col gap-8 py-8 lg:gap-12 lg:py-12">
						<div className="grid grid-cols-[1fr_auto] gap-12">
							<h2
								className={`text-fg text-heading-lg font-strong`}
							>
								{content.title}
							</h2>
							<div className="relative aspect-square overflow-hidden rounded-full h-full">
								<Image
									src={images[activeGroup.id]}
									alt=""
									fill
									sizes="40vw"
									className="object-cover"
								/>
							</div>
						</div>
						{/* <div className="max-w-6xl space-y-7 text-body-sm lg:text-body-md font-subtle text-fg">
							{leadIntro.map((paragraph) => (
								<p key={paragraph}>{paragraph}</p>
							))}
						</div> */}
					</header>

					<div className="flex flex-col py-8 lg:py-12 space-y-16 lg:space-y-24 border-t border-border">
						<div className="flex items-start justify-between gap-8">
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
											} ${lang == "fa" ? "pb-0.5" : "pb-0"}`}
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
								>
									{isRtl ? (
										<ArrowLeft className="w-4 h-4" />
									) : (
										<ArrowRight className="w-4 h-4" />
									)}
								</Button>
							</div>
						</div>

						<AnimatePresence initial={false} mode="wait">
							<motion.article
								key={activeGroup.id}
								id={`age-panel-${activeGroup.id}`}
								role="tabpanel"
								aria-labelledby={`age-tab-${activeGroup.id}`}
								variants={panelVariants}
								initial="enter"
								animate="center"
								exit="exit"
								transition={{
									duration: reduceMotion ? 0 : 0.28,
									ease: [0.22, 1, 0.36, 1],
								}}
								className="grid grid-cols-[1fr_384px] justify-between gap-12"
							>
								<div
									className={`flex flex-col justify-between gap-16`}
								>
									<div className={`flex flex-col space-y-1`}>
										<h3 className="text-heading-md font-strong text-fg">
											{activeGroup.label}
										</h3>
										<p className="text-body-md font-subtle text-fg-subtle">
											{activeGroup.age}
										</p>
									</div>
									<p className="text-body-sm font-subtle text-fg">
										{activeGroup.description}
									</p>
								</div>

								<div className="relative aspect-4/3 w-full min-h-full overflow-hidden rounded-3xl">
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
				<div className="flex flex-col justify-center rounded-3xl bg-bg-tertiary md:hidden">
					<header className="mx-auto flex w-full max-w-xl flex-col gap-10 px-5 py-16">
						<div className="flex flex-col items-center space-y-5">
							<div className="relative aspect-square overflow-hidden rounded-full w-full max-w-24">
								<Image
									src={images[activeGroup.id]}
									alt=""
									fill
									sizes="40vw"
									className="object-cover"
								/>
							</div>
							<h2
								className={`text-fg text-heading-lg md:text-heading-lg font-strong`}
							>
								{content.title}
							</h2>
						</div>
						<div className="max-w-6xl flex flex-col justify-center text-center space-y-5 text-body-sm font-subtle text-fg">
							{leadIntro.map((paragraph) => (
								<p key={paragraph}>{paragraph}</p>
							))}
						</div>
					</header>

					<div className="flex flex-col p-5 space-y-5 border-t border-border-subtle overflow-hidden">
						<div className="flex items-start justify-between gap-8">
							<div className={`flex flex-col space-y-1`}>
								<h3 className="text-heading-sm font-strong text-fg">
									{activeGroup.label}
								</h3>
								<p className="text-body-sm font-subtle text-fg-subtle">
									{activeGroup.age}
								</p>
							</div>
							<div className="flex shrink-0 gap-2">
								<Button
									lang={lang}
									iconOnly
									variant="subtle"
									color="secondary"
									size="md"
									radius="full"
									onClick={previousGroup}
									aria-label={content.previous}
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
								>
									{isRtl ? (
										<ArrowLeft className="w-4 h-4" />
									) : (
										<ArrowRight className="w-4 h-4" />
									)}
								</Button>
							</div>
						</div>

						<AnimatePresence initial={false} mode="wait">
							<motion.article
								key={activeGroup.id}
								id={`age-panel-${activeGroup.id}`}
								role="tabpanel"
								aria-labelledby={`age-tab-${activeGroup.id}`}
								variants={panelVariants}
								initial="enter"
								animate="center"
								exit="exit"
								transition={{
									duration: reduceMotion ? 0 : 0.28,
									ease: [0.22, 1, 0.36, 1],
								}}
								className="flex flex-col space-y-5"
							>
								<div className="relative aspect-4/3 w-full min-h-full overflow-hidden rounded-2xl">
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
						<div className={`flex`}>
							<p className="text-body-sm font-subtle text-fg">
								{activeGroup.description}
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
