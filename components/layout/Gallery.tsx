import { getDictionary, type Locale } from "@/lib/i18n";
import GalleryContent from "./GalleryContent";

type GalleryProps = {
	lang: Locale;
};

export default function Gallery({ lang }: GalleryProps) {
	const dictionary = getDictionary(lang);

	return <GalleryContent lang={lang} content={dictionary.gallery} />;
}
