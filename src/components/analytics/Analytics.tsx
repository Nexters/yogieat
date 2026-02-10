"use client";

// GA4 & GTM Analytics Integration
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export const Analytics = () => {
	const isDev = process.env.NODE_ENV === "development";

	// Debug: 환경 변수 값 확인 (임시)
	console.log("[Analytics Debug]", {
		GTM_ID: GTM_ID ? `${GTM_ID.substring(0, 4)}...` : "undefined",
		GA_ID: GA_ID ? `${GA_ID.substring(0, 4)}...` : "undefined",
		NODE_ENV: process.env.NODE_ENV,
	});

	if (!GTM_ID && isDev) {
		console.warn(
			"Google Tag Manager ID(NEXT_PUBLIC_GTM_ID) is not configured.",
		);
	}

	if (!GA_ID && isDev) {
		console.warn(
			"Google Analytics ID(NEXT_PUBLIC_GA_ID) is not configured.",
		);
	}

	return (
		<>
			{GTM_ID && <GoogleTagManager gtmId={GTM_ID} />}
			{GA_ID && <GoogleAnalytics gaId={GA_ID} debugMode={isDev} />}
		</>
	);
};
