import localFont from "next/font/local";

export const outfit = localFont({
	src: "../app/assets/fonts/outfit/Outfit-VariableFont_wght.ttf",
	variable: "--font-outfit",
	display: "swap",
	weight: "100 900",
});

export const kalameh = localFont({
	src: [
		{
			path: "../app/assets/fonts/kalameh/Kalameh-Regular.ttf",
			weight: "400",
		},
		{
			path: "../app/assets/fonts/kalameh/Kalameh-Bold.ttf",
			weight: "700",
		},
	],

	variable: "--font-kalameh",
	display: "swap",
});
