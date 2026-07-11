import LogoEn from "./LogoEn";
import LogoFa from "./LogoFa";

type LogoProps = {
	lang: "en" | "fa";
	className?: string;
};

export default function Logo({ lang, className }: LogoProps) {
	return lang === "fa" ? (
		<LogoFa className={className} />
	) : (
		<LogoEn className={className} />
	);
}
