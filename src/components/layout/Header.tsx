import type { ReactNode } from "react";
import { twJoin } from "tailwind-merge";

type LayoutBackground = "white" | "gray";

const BACKGROUND_CLASSES: Record<LayoutBackground, string> = {
	white: "ygi:bg-bg-white",
	gray: "ygi:bg-bg-gray",
};

interface HeaderProps {
	children: ReactNode;
	background?: LayoutBackground;
}

export const Header = ({ children, background = "white" }: HeaderProps) => {
	return (
		<header className="ygi:fixed ygi:top-0 ygi:left-0 ygi:z-layout-header ygi:flex ygi:h-layout-header-height ygi:w-full ygi:items-center ygi:justify-center">
			<div
				className={twJoin(
					"ygi:h-layout-header-height ygi:w-full ygi:max-w-root-layout ygi:px-3",
					BACKGROUND_CLASSES[background],
				)}
			>
				{children}
			</div>
		</header>
	);
};
