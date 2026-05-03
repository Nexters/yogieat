import type { ReactNode } from "react";

import { QueryProvider } from "#/providers";

interface RestaurantsLayoutProps {
	children: ReactNode;
}

export default function RestaurantsLayout({
	children,
}: RestaurantsLayoutProps) {
	return <QueryProvider>{children}</QueryProvider>;
}
