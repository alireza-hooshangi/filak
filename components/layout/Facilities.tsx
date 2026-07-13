import { getDictionary, type Locale } from "@/lib/i18n";
import FacilitiesContent from "./FacilitiesContent";

type FacilitiesProps = {
	lang: Locale;
};

export default function Facilities({ lang }: FacilitiesProps) {
	const dictionary = getDictionary(lang);

	return <FacilitiesContent lang={lang} content={dictionary.facilities} />;
}
