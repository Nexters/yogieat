import {
	HydrationBoundary,
	QueryClient,
	dehydrate,
} from "@tanstack/react-query";
import { notFound } from "next/navigation";

import { gatheringQueryOptions } from "#/apis/gathering";
import { LandingView } from "#/pageComponents/gathering/opinion";
import { ERROR_CODES, isApiError } from "#/utils/api";

interface LandingPageProps {
	params: Promise<{
		accessKey: string;
	}>;
}

export default async function LandingPage({ params }: LandingPageProps) {
	const { accessKey } = await params;
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				retry: 0,
			},
		},
	});

	try {
		await Promise.all([
			queryClient.fetchQuery(gatheringQueryOptions.detail(accessKey)),
			queryClient.fetchQuery(gatheringQueryOptions.capacity(accessKey)),
		]);
	} catch (error) {
		if (isApiError(error)) {
			switch (error.errorCode) {
				case ERROR_CODES.GATHERING_NOT_FOUND:
				case ERROR_CODES.GATHERING_DELETED:
					notFound();
			}
		}

		throw error;
	}

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<LandingView />
		</HydrationBoundary>
	);
}
