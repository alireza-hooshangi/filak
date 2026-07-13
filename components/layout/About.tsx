import Image from "next/image";

import { getDictionary, type Locale } from "@/lib/i18n";

type AboutProps = {
	lang: Locale;
};

const sectionImages: Record<string, string> = {
	aboutFilak: "/images/about/about-filak.png",
	whyFilak: "/images/about/why-filak.png",
	filakTeam: "/images/about/filak-team.png",
};

export default function About({ lang }: AboutProps) {
	const { about } = getDictionary(lang);

	return (
		<section id="about" className="px-5 md:px-8 pt-24 md:pt-48 lg:pt-60">
			<div className="mx-auto flex w-full max-w-5xl flex-col gap-24 lg:gap-48">
				{about.sections.map((section, index) => {
					const imageOnLeft = index % 2 === 1;

					return (
						<article
							key={section.id}
							className="grid lg:grid-cols-2 gap-7 md:gap-12 lg:gap-24"
						>
							<div
								className={`flex flex-col justify-between space-y-6 lg:space-y-16 ${imageOnLeft ? "lg:order-2" : undefined}`}
							>
								<h2 className="text-heading-lg font-strong text-fg">
									{section.title}
								</h2>
								<div className="flex flex-col space-y-4 md:space-y-7 text-body-sm md:text-body-md font-subtle text-fg">
									{section.paragraphs.map((paragraph) => (
										<p key={paragraph}>{paragraph}</p>
									))}
								</div>
							</div>

							<div
								className={`relative aspect-5/4 lg:aspect-4/5 w-full min-h-full overflow-hidden rounded-2xl md:rounded-[48px] ${
									imageOnLeft
										? "lg:order-1"
										: "lg:order-2 lg:justify-self-end"
								}`}
							>
								<Image
									src={sectionImages[section.id]}
									alt=""
									fill
									sizes="(max-width: 768px) calc(100vw - 40px), 432px"
									className="object-cover"
								/>
							</div>
						</article>
					);
				})}
			</div>
		</section>
	);
}
