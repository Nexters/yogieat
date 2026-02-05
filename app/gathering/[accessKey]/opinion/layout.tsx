import type { ReactNode } from "react";

import { Layout } from "#/components/layout";

interface OpinionLayoutProps {
	children: ReactNode;
}

export default function OpinionLayout({ children }: OpinionLayoutProps) {
	return <Layout.Root>{children}</Layout.Root>;
}
