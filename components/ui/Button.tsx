import Link from "next/link";
import type {
	ButtonHTMLAttributes,
	ComponentPropsWithoutRef,
	ReactNode,
} from "react";

type ButtonVariant = "solid" | "outline" | "subtle";
type ButtonColor = "primary" | "secondary" | "tertiary";
type ButtonSize = "sm" | "md" | "lg";
type ButtonRadius = "default" | "full";
type ButtonLanguage = "fa" | "en";

type SharedProps = {
	children: ReactNode;
	lang: ButtonLanguage;
	variant?: ButtonVariant;
	color?: ButtonColor;
	size?: ButtonSize;
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

	const classes = [
		baseStyles,
		fontWeightStyles[lang],
		sizeStyles[lang][size],
		radiusStyles[radius][size],
		iconOnly ? iconOnlyStyles[size] : paddingStyles[size],
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
