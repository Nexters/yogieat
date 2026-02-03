import type { ReactNode } from "react";

interface RootProps {
	children: ReactNode;
}

export const Root = ({ children }: RootProps) => {
	return (
		<div className="ygi:relative ygi:mx-auto ygi:min-h-screen-dynamic ygi:w-full ygi:max-w-root-layout ygi:shadow-drop">
			{children}
		</div>
	);
};
