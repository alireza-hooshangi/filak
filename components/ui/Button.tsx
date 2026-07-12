import Link from "next/link";
import type {
	ButtonHTMLAttributes,
	ComponentPropsWithoutRef,
	ReactNode,
} from "react";

type ButtonVariant = "solid" | "outline" | "subtle";
type ButtonColor = "primary" | "secondary" | "tertiary";
type ButtonSize = "sm" | "md" | "lg";
type ButtonBreakpoint = "sm" | "md" | "lg" | "xl" | "2xl";
type ResponsiveButtonSize = {
	base: ButtonSize;
} & Partial<Record<ButtonBreakpoint, ButtonSize>>;
type ButtonRadius = "default" | "full";
type ButtonLanguage = "fa" | "en";

type SharedProps = {
	children: ReactNode;
	lang: ButtonLanguage;
	variant?: ButtonVariant;
	color?: ButtonColor;
	size?: ButtonSize | ResponsiveButtonSize;
	radius?: ButtonRadius;
	iconOnly?: boolean;
	className?: string;
};

type NativeButtonProps = SharedProps &
	ButtonHTMLAttributes<HTMLButtonElement> & {
		href?: undefined;
	};

type LinkButtonProps = SharedProps &
	Omit<ComponentPropsWithoutRef<typeof Link>, "href"> & {
		href: string;
		disabled?: boolean;
	};

type ButtonProps = NativeButtonProps | LinkButtonProps;

const baseStyles =
	"inline-flex shrink-0 items-center justify-center whitespace-nowrap transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-40";

const fontWeightStyles: Record<ButtonLanguage, string> = {
	fa: "font-bold",
	en: "font-medium",
};

const sizeStyles: Record<ButtonLanguage, Record<ButtonSize, string>> = {
	fa: {
		sm: "h-8 text-base",
		md: "h-10 text-xl",
		lg: "h-12 text-xl",
	},
	en: {
		sm: "h-8 text-sm",
		md: "h-10 text-base",
		lg: "h-12 text-base",
	},
};

const radiusStyles: Record<ButtonRadius, Record<ButtonSize, string>> = {
	default: {
		sm: "rounded-lg",
		md: "rounded-[10px]",
		lg: "rounded-xl",
	},
	full: {
		sm: "rounded-full",
		md: "rounded-full",
		lg: "rounded-full",
	},
};

const paddingStyles: Record<ButtonSize, string> = {
	sm: "px-3",
	md: "px-4",
	lg: "px-6",
};

const iconOnlyStyles: Record<ButtonSize, string> = {
	sm: "w-8 p-0",
	md: "w-10 p-0",
	lg: "w-12 p-0",
};

const breakpointSizeStyles: Record<
	ButtonBreakpoint,
	Record<ButtonLanguage, Record<ButtonSize, string>>
> = {
	sm: {
		fa: { sm: "sm:h-8 sm:text-base", md: "sm:h-10 sm:text-xl", lg: "sm:h-12 sm:text-xl" },
		en: { sm: "sm:h-8 sm:text-sm", md: "sm:h-10 sm:text-base", lg: "sm:h-12 sm:text-base" },
	},
	md: {
		fa: { sm: "md:h-8 md:text-base", md: "md:h-10 md:text-xl", lg: "md:h-12 md:text-xl" },
		en: { sm: "md:h-8 md:text-sm", md: "md:h-10 md:text-base", lg: "md:h-12 md:text-base" },
	},
	lg: {
		fa: { sm: "lg:h-8 lg:text-base", md: "lg:h-10 lg:text-xl", lg: "lg:h-12 lg:text-xl" },
		en: { sm: "lg:h-8 lg:text-sm", md: "lg:h-10 lg:text-base", lg: "lg:h-12 lg:text-base" },
	},
	xl: {
		fa: { sm: "xl:h-8 xl:text-base", md: "xl:h-10 xl:text-xl", lg: "xl:h-12 xl:text-xl" },
		en: { sm: "xl:h-8 xl:text-sm", md: "xl:h-10 xl:text-base", lg: "xl:h-12 xl:text-base" },
	},
	"2xl": {
		fa: { sm: "2xl:h-8 2xl:text-base", md: "2xl:h-10 2xl:text-xl", lg: "2xl:h-12 2xl:text-xl" },
		en: { sm: "2xl:h-8 2xl:text-sm", md: "2xl:h-10 2xl:text-base", lg: "2xl:h-12 2xl:text-base" },
	},
};

const breakpointShapeStyles: Record<
	ButtonBreakpoint,
	Record<ButtonRadius, Record<ButtonSize, string>>
> = {
	sm: {
		default: { sm: "sm:rounded-lg", md: "sm:rounded-[10px]", lg: "sm:rounded-xl" },
		full: { sm: "sm:rounded-full", md: "sm:rounded-full", lg: "sm:rounded-full" },
	},
	md: {
		default: { sm: "md:rounded-lg", md: "md:rounded-[10px]", lg: "md:rounded-xl" },
		full: { sm: "md:rounded-full", md: "md:rounded-full", lg: "md:rounded-full" },
	},
	lg: {
		default: { sm: "lg:rounded-lg", md: "lg:rounded-[10px]", lg: "lg:rounded-xl" },
		full: { sm: "lg:rounded-full", md: "lg:rounded-full", lg: "lg:rounded-full" },
	},
	xl: {
		default: { sm: "xl:rounded-lg", md: "xl:rounded-[10px]", lg: "xl:rounded-xl" },
		full: { sm: "xl:rounded-full", md: "xl:rounded-full", lg: "xl:rounded-full" },
	},
	"2xl": {
		default: { sm: "2xl:rounded-lg", md: "2xl:rounded-[10px]", lg: "2xl:rounded-xl" },
		full: { sm: "2xl:rounded-full", md: "2xl:rounded-full", lg: "2xl:rounded-full" },
	},
};

const breakpointSpacingStyles: Record<
	ButtonBreakpoint,
	Record<"default" | "iconOnly", Record<ButtonSize, string>>
> = {
	sm: {
		default: { sm: "sm:px-3", md: "sm:px-4", lg: "sm:px-6" },
		iconOnly: { sm: "sm:w-8 sm:p-0", md: "sm:w-10 sm:p-0", lg: "sm:w-12 sm:p-0" },
	},
	md: {
		default: { sm: "md:px-3", md: "md:px-4", lg: "md:px-6" },
		iconOnly: { sm: "md:w-8 md:p-0", md: "md:w-10 md:p-0", lg: "md:w-12 md:p-0" },
	},
	lg: {
		default: { sm: "lg:px-3", md: "lg:px-4", lg: "lg:px-6" },
		iconOnly: { sm: "lg:w-8 lg:p-0", md: "lg:w-10 lg:p-0", lg: "lg:w-12 lg:p-0" },
	},
	xl: {
		default: { sm: "xl:px-3", md: "xl:px-4", lg: "xl:px-6" },
		iconOnly: { sm: "xl:w-8 xl:p-0", md: "xl:w-10 xl:p-0", lg: "xl:w-12 xl:p-0" },
	},
	"2xl": {
		default: { sm: "2xl:px-3", md: "2xl:px-4", lg: "2xl:px-6" },
		iconOnly: { sm: "2xl:w-8 2xl:p-0", md: "2xl:w-10 2xl:p-0", lg: "2xl:w-12 2xl:p-0" },
	},
};

const variantStyles: Record<ButtonVariant, Record<ButtonColor, string>> = {
	solid: {
		primary:
			"bg-violet-500 text-white hover:bg-violet-600 focus-visible:ring-violet-500",
		secondary:
			"bg-gray-800 text-white hover:bg-gray-800/90 focus-visible:ring-gray-800",
		tertiary:
			"bg-white text-gray-800 hover:bg-white/90 focus-visible:ring-gray-300",
	},
	outline: {
		primary:
			"border border-violet-500 text-violet-500 hover:bg-violet-500/10 focus-visible:ring-violet-500",
		secondary:
			"border border-gray-800 text-gray-800 hover:bg-gray-800/10 focus-visible:ring-gray-800",
		tertiary:
			"border border-gray-300 text-gray-800 hover:bg-gray-100 focus-visible:ring-gray-300",
	},
	subtle: {
		primary:
			"bg-violet-500/10 text-violet-500 hover:bg-violet-500/20 focus-visible:ring-violet-500",
		secondary:
			"bg-black/5 text-gray-800 hover:bg-gray-800 hover:text-white focus-visible:ring-gray-800 transition-all",
		tertiary:
			"bg-white/50 text-gray-800 hover:bg-white/70 focus-visible:ring-gray-300",
	},
};

export default function Button(props: ButtonProps) {
	const {
		children,
		lang,
		variant = "solid",
		color = "primary",
		size = "md",
		radius = "default",
		iconOnly = false,
		className = "",
	} = props;

	const baseSize = typeof size === "string" ? size : size.base;
	const responsiveSizeClasses =
		typeof size === "string"
			? []
			: (Object.entries(size) as ["base" | ButtonBreakpoint, ButtonSize][])
					.filter(([breakpoint]) => breakpoint !== "base")
					.flatMap(([breakpoint, breakpointSize]) => {
						const responsiveBreakpoint = breakpoint as ButtonBreakpoint;

						return [
							breakpointSizeStyles[responsiveBreakpoint][lang][breakpointSize],
							breakpointShapeStyles[responsiveBreakpoint][radius][breakpointSize],
							breakpointSpacingStyles[responsiveBreakpoint][iconOnly ? "iconOnly" : "default"][breakpointSize],
						];
					});

	const classes = [
		baseStyles,
		fontWeightStyles[lang],
		sizeStyles[lang][baseSize],
		radiusStyles[radius][baseSize],
		iconOnly ? iconOnlyStyles[baseSize] : paddingStyles[baseSize],
		...responsiveSizeClasses,
		variantStyles[variant][color],
		className,
	]
		.filter(Boolean)
		.join(" ");

	if (props.href !== undefined) {
		const {
			href,
			disabled,
			children: _children,
			lang: _lang,
			variant: _variant,
			color: _color,
			size: _size,
			radius: _radius,
			iconOnly: _iconOnly,
			className: _className,
			...linkProps
		} = props;

		return (
			<Link
				href={href}
				className={`${classes} ${
					disabled ? "pointer-events-none opacity-40" : ""
				}`}
				aria-disabled={disabled || undefined}
				tabIndex={disabled ? -1 : undefined}
				{...linkProps}
			>
				{children}
			</Link>
		);
	}

	const {
		children: _children,
		lang: _lang,
		variant: _variant,
		color: _color,
		size: _size,
		radius: _radius,
		iconOnly: _iconOnly,
		className: _className,
		href: _href,
		...buttonProps
	} = props;

	return (
		<button className={classes} {...buttonProps}>
			{children}
		</button>
	);
}
