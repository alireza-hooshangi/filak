import { notFound } from "next/navigation";

import { isLocale } from "@/lib/i18n";
import Hero from "@/components/layout/Hero";
import AgeGroups from "@/components/layout/AgeGroups";
import Facilities from "@/components/layout/Facilities";

type HomePageProps = {
	params: Promise<{
		lang: string;
	}>;
};

export default async function HomePage({ params }: HomePageProps) {
	const { lang } = await params;

	if (!isLocale(lang)) {
		notFound();
	}

	return (
		<>
			<Hero lang={lang} />
			<AgeGroups lang={lang} />
			<Facilities lang={lang} />
		</>
	);
}
