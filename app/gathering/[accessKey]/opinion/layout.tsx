import type { ReactNode } from "react";
import type { Metadata } from "next";

import { Layout } from "#/components/layout";

interface OpinionLayoutProps {
	children: ReactNode;
}


export const metadata: Metadata = {
	title: "요기잇",
	description: "다인원을 위한 맛집 추천 서비스",
	openGraph: {
		title: "함께 갈 맛집, 같이 정해요!",
		description: "[요기잇] 다인원을 위한 맛집 서비스",
		type: "website",
		images: [
			{
				url: "https://yogieat-statics.s3.ap-southeast-2.amazonaws.com/images/opengraph/opinion-landing-og-image.png",
				width: 1200,
				height: 630,
				alt: "요기잇 - 의견 수합",
			},
		],
	},
};


export default function layout({ children }: OpinionLayoutProps) {
	return <Layout.Root>{children}</Layout.Root>;
}
