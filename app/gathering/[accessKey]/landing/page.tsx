import {
	HydrationBoundary,
	QueryClient,
	dehydrate,
} from "@tanstack/react-query";

import { gatheringQueryOptions } from "#/apis/gathering";
import { LandingView } from "#/pageComponents/gathering/opinion";

interface LandingPageProps {
	params: Promise<{
		accessKey: string;
	}>;
}

export default async function LandingPage({ params }: LandingPageProps) {
	const { accessKey } = await params;
	const queryClient = new QueryClient();

	await Promise.all([
		queryClient.prefetchQuery(gatheringQueryOptions.detail(accessKey)),
		queryClient.prefetchQuery(gatheringQueryOptions.capacity(accessKey)),
	]);

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<LandingView />
		</HydrationBoundary>
	);
}
