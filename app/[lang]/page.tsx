import { notFound } from "next/navigation";

import { getDictionary, isLocale } from "@/lib/i18n";
import Hero from "@/components/layout/Hero";
import AgeGroups from "@/components/layout/AgeGroups";

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

	const dictionary = getDictionary(lang);

	return (
		<>
			<Hero lang={lang} />
			<AgeGroups lang={lang} />
		</>
	);
}
