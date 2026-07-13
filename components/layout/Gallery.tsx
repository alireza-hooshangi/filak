import { getDictionary, type Locale } from "@/lib/i18n";

import GalleryContent from "./GalleryContent";

type GalleryProps = {
	lang: Locale;
};

export default function Gallery({ lang }: GalleryProps) {
	const dictionary = getDictionary(lang);
	const galleryItems = [
		...dictionary.gallery.items,
		...dictionary.gallery.items.slice(0, 3).map((item) => ({
			...item,
			id: `${item.id}-gallery-extra`,
		})),
	];

	return (
		<GalleryContent
			content={{
				...dictionary.gallery,
				items: galleryItems,
			}}
		/>
	);
}
