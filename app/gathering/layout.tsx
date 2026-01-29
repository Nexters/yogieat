import type { ReactNode } from "react";

import { QueryProvider } from "#/providers";

interface GatheringLayoutProps {
	children: ReactNode;
}

export default function GatheringLayout({ children }: GatheringLayoutProps) {
	return <QueryProvider>{children}</QueryProvider>;
}
