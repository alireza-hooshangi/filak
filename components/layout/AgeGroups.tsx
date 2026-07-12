import { getDictionary, type Locale } from "@/lib/i18n";
import AgeGroupsContent from "./AgeGroupsContent";

type AgeGroupsProps = {
	lang: Locale;
};

export default function AgeGroups({ lang }: AgeGroupsProps) {
	const dictionary = getDictionary(lang);

	return <AgeGroupsContent lang={lang} content={dictionary.ageGroups} />;
}
