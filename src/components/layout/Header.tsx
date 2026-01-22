import type { ReactNode } from "react";

interface HeaderProps {
	children: ReactNode;
}

export const Header = ({ children }: HeaderProps) => {
	return (
		<header className="ygi:fixed ygi:top-0 ygi:left-0 ygi:z-layout-header ygi:flex ygi:h-layout-header-height ygi:w-full ygi:items-center ygi:justify-center">
			<div className="ygi:h-layout-header-height ygi:w-full ygi:max-w-root-layout">
				{children}
			</div>
		</header>
	);
};
