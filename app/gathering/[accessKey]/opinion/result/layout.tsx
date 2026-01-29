import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
	title: "요기잇",
	description: "다인원을 위한 맛집 추천 서비스",
	openGraph: {
		title: "메뉴 추천이 완료 되었어요",
		description: "[요기잇] 추천 결과를 확인해 보세요",
		type: "website",
		images: [
			{
				url: "https://yogieat-statics.s3.ap-southeast-2.amazonaws.com/images/opengraph/opinion-result-og-image.png",
				width: 1200,
				height: 630,
				alt: "요기잇 - 추천 결과",
			},
		],
	},
};

interface LayoutProps {
	children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
	return children;
}
