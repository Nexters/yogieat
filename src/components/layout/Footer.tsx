import type { ReactNode } from "react";
import { twJoin } from "tailwind-merge";

type LayoutBackground = "white" | "gray";

const BACKGROUND_CLASSES: Record<LayoutBackground, string> = {
	white: "ygi:bg-bg-white",
	gray: "ygi:bg-bg-gray",
};

interface FooterProps {
	children: ReactNode;
	background?: LayoutBackground;
}

export const Footer = ({ children, background = "white" }: FooterProps) => {
	return (
		<footer className="ygi:fixed ygi:bottom-0 ygi:left-0 ygi:z-layout-footer ygi:flex ygi:h-layout-footer-height ygi:w-full ygi:items-center ygi:justify-center">
			<div
				className={twJoin(
					`ygi:h-layout-footer-height ygi:w-full ygi:max-w-root-layout`,
					BACKGROUND_CLASSES[background],
				)}
			>
				{children}
			</div>
		</footer>
	);
};
