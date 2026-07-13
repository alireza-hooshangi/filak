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
			path: "../app/assets/fonts/kalameh/woff2/KalamehWeb-Regular.woff2",
			weight: "400",
			style: "normal",
		},
		{
			path: "../app/assets/fonts/kalameh/woff2/KalamehWeb-SemiBold.woff2",
			weight: "600",
			style: "normal",
		},
		{
			path: "../app/assets/fonts/kalameh/woff2/KalamehWeb-Bold.woff2",
			weight: "700",
			style: "normal",
		},
	],
	variable: "--font-kalameh",
	display: "swap",
});
