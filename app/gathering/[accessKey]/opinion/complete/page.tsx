import {
	HydrationBoundary,
	QueryClient,
	dehydrate,
} from "@tanstack/react-query";
import { notFound, redirect } from "next/navigation";

import { gatheringQueryOptions } from "#/apis/gathering";
import { recommendResultOptions } from "#/apis/recommendResult";

import { CompleteViewContainer } from "./CompleteViewContainer";
import { ERROR_CODES, isApiError } from "#/utils/api";

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

	try {
		const [, { data: capacity }] = await Promise.all([
			queryClient.fetchQuery(recommendResultOptions.detail(accessKey)),
			queryClient.fetchQuery(gatheringQueryOptions.capacity(accessKey)),
		]);

		if (capacity.maxCount > capacity.currentCount) {
			redirect(`/gathering/${accessKey}/opinion/pending`);
		}
	} catch (error) {
		if (isApiError(error)) {
			switch (error.errorCode) {
				case ERROR_CODES.RECOMMEND_ALREADY_PROCEEDED:
					redirect(`/gathering/${accessKey}/opinion/result`);

				case ERROR_CODES.RESTAURANT_NOT_FOUND:
				case ERROR_CODES.CATEGORY_NOT_FOUND:
				case ERROR_CODES.GATHERING_NOT_FOUND:
				case ERROR_CODES.GATHERING_DELETED:
					notFound();
			}
		}

		throw error;
	}

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<CompleteViewContainer />
		</HydrationBoundary>
	);
}
