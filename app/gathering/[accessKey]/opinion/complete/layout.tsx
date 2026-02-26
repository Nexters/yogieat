import type { Metadata } from "next";
import type { ReactNode } from "react";

import { ServerSentEventProvider } from "#/hooks/sse";

export const metadata: Metadata = {
	title: "요기잇",
	description: "다인원을 위한 맛집 추천 서비스",
	openGraph: {
		title: "함께 갈 맛집, 같이 정해요!",
		description: "[요기잇] 다인원을 위한 맛집 서비스",
		type: "website",
		locale: "ko_KR",
		siteName: "요기잇",
		images: [
			{
				url: "https://yogieat-statics.s3.ap-southeast-2.amazonaws.com/images/opengraph/opinion-complete-og-image.png",
				width: 1200,
				height: 630,
				alt: "요기잇 - 의견 수합 완료",
			},
		],
	},
};

interface LayoutProps {
	children: ReactNode;
	params: Promise<{ accessKey: string }>;
}

export default async function Layout({ children, params }: LayoutProps) {
	const { accessKey } = await params;

	return (
		<ServerSentEventProvider url={`/gatherings/${accessKey}/subscribe`}>
			{children}
		</ServerSentEventProvider>
	);
}
