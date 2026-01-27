import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Toaster } from "#/components/toast/Toaster";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "요기잇",
	description: "다인원을 위한 맛집 추천 서비스",
	openGraph: {
		title: "요기잇",
		description: "다인원을 위한 맛집 추천 서비스",
		type: "website",
		// TODO: OG 이미지 추가 시 아래 주석 해제
		// images: [
		// 	{
		// 		url: "/images/og-image.png",
		// 		width: 1200,
		// 		height: 630,
		// 		alt: "요기잇",
		// 	},
		// ],
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
		<html lang="en" className="ygi:overflow-x-hidden">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased ygi:overflow-x-hidden`}
			>
				{children}
				<Toaster offset={100} />
			</body>
		</html>
	);
}
