import {
	HydrationBoundary,
	QueryClient,
	dehydrate,
} from "@tanstack/react-query";

import { gatheringQueryOptions } from "#/apis/gathering";
import { OpinionFormView } from "#/pageComponents/gathering/opinion";

interface OpinionPageProps {
	params: Promise<{
		accessKey: string;
	}>;
}

export default async function OpinionPage({ params }: OpinionPageProps) {
	const { accessKey } = await params;
	const queryClient = new QueryClient();

	await Promise.all([
		queryClient.prefetchQuery(gatheringQueryOptions.detail(accessKey)),
		queryClient.prefetchQuery(gatheringQueryOptions.capacity(accessKey)),
	]);

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<OpinionFormView />
		</HydrationBoundary>
	);
}
