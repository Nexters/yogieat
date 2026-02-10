"use client";

import { GoogleTagManager } from "@next/third-parties/google";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

export const Analytics = () => {
	if (!GTM_ID) {
		if (process.env.NODE_ENV === "development") {
			console.warn(
				"Google Tag Manager ID(NEXT_PUBLIC_GTM_ID) is not configured.",
			);
		}
		return null;
	}

	return <GoogleTagManager gtmId={GTM_ID} />;
};
