import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "#/components/analytics";
import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	// 모든 페이지의 OG URL, canonical URL 등이 이 도메인 기준으로 자동 생성됨
	metadataBase: new URL("https://yogieat.com"),
	title: "요기잇",
	description: "다인원을 위한 맛집 추천 서비스",
	verification: {
		google: "DWerIwsk8QxOFZn9w97PETIerR75SFr21Xp",
		other: {
			"naver-site-verification":
				"dca905378a4e205448cc02fa95930206096ac4aa",
		},
	},
	openGraph: {
		title: "요기잇",
		description: "다인원을 위한 맛집 추천 서비스",
		type: "website",
		images: [
			{
				url: "https://yogieat-statics.s3.ap-southeast-2.amazonaws.com/images/opengraph/landing-og-image.png",
				width: 1200,
				height: 630,
				alt: "요기잇",
			},
		],
	},
};

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	viewportFit: "cover",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ko" className="ygi:overflow-x-hidden">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased ygi:overflow-x-hidden ygi:bg-bg-website`}
			>
				{children}
				<Analytics />
			</body>
		</html>
	);
}
