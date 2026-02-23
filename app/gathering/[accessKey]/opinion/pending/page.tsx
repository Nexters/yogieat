import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from "@tanstack/react-query";

import { gatheringQueryOptions } from "#/apis/gathering";
import { recommendResultOptions } from "#/apis/recommendResult";

import { PendingViewContainer } from "./PendingViewContainer";

interface OpinionPendingPageProps {
	params: Promise<{
		accessKey: string;
	}>;
}

export default async function OpinionPendingPage({
	params,
}: OpinionPendingPageProps) {
	const { accessKey } = await params;
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				retry: 0,
			},
		},
	});

	await Promise.all([
		queryClient.prefetchQuery(recommendResultOptions.detail(accessKey)),
		queryClient.prefetchQuery(gatheringQueryOptions.capacity(accessKey)),
	]);

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<PendingViewContainer />
		</HydrationBoundary>
	);
}
