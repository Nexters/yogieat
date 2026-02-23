import {
	HydrationBoundary,
	QueryClient,
	dehydrate,
} from "@tanstack/react-query";
import { redirect } from "next/navigation";

import { gatheringQueryOptions } from "#/apis/gathering";
import { recommendResultOptions } from "#/apis/recommendResult";

import { CompleteViewContainer } from "./CompleteViewContainer";

interface OpinionCompletePageProps {
	params: Promise<{
		accessKey: string;
	}>;
}

export default async function OpinionCompletePage({
	params,
}: OpinionCompletePageProps) {
	const { accessKey } = await params;
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				retry: 0,
			},
		},
	});

	const [, { data: capacity }] = await Promise.all([
		queryClient.fetchQuery(recommendResultOptions.detail(accessKey)),
		queryClient.fetchQuery(gatheringQueryOptions.capacity(accessKey)),
	]);

	if (capacity.maxCount > capacity.currentCount) {
		redirect(`/gathering/${accessKey}/opinion/pending`);
	}

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<CompleteViewContainer />
		</HydrationBoundary>
	);
}
