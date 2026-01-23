import type { ReactNode } from "react";

interface FooterProps {
	children: ReactNode;
}
export const Footer = ({ children }: FooterProps) => {
	return (
		<footer className="ygi:fixed ygi:bottom-0 ygi:left-0 ygi:z-layout-footer ygi:flex ygi:h-layout-footer-height ygi:w-full ygi:items-center ygi:justify-center ygi:bg-bg-white">
			<div className="ygi:h-layout-footer-height ygi:w-full ygi:max-w-root-layout">
				{children}
			</div>
		</footer>
	);
};
