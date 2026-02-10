"use client";

import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export const Analytics = () => {
	const isDev = process.env.NODE_ENV === "development";

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
