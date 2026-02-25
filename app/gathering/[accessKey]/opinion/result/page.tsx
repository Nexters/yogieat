import {
	HydrationBoundary,
	QueryClient,
	dehydrate,
} from "@tanstack/react-query";
import { notFound, redirect } from "next/navigation";

import { gatheringQueryOptions } from "#/apis/gathering";
import { recommendResultOptions } from "#/apis/recommendResult";
import { ERROR_CODES, isApiError } from "#/utils/api";
import { RecommendationResultStatus } from "#/constants/gathering/opinion";

import { ResultPage } from "#/pageComponents/gathering/opinion/result";

interface GatheringOpinionResultProps {
	params: Promise<{
		accessKey: string;
	}>;
}

export default async function GatheringOpinionResult({
	params,
}: GatheringOpinionResultProps) {
	const { accessKey } = await params;
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				retry: 0,
			},
		},
	});

	try {
		const [{ data: recommendResult }, { data: capacity }] =
			await Promise.all([
				queryClient.fetchQuery(
					recommendResultOptions.detail(accessKey),
				),
				queryClient.fetchQuery(
					gatheringQueryOptions.capacity(accessKey),
				),
			]);

		if (recommendResult.status !== RecommendationResultStatus.COMPLETED) {
			if (capacity.maxCount === capacity.currentCount) {
				redirect(`/gathering/${accessKey}/opinion/complete`);
			}

			redirect(`/gathering/${accessKey}/opinion/pending`);
		}
	} catch (error) {
		if (isApiError(error)) {
			switch (error.errorCode) {
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
			<ResultPage />
		</HydrationBoundary>
	);
}
