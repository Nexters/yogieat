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

import { ResultViewContainer } from "./ResultViewContainer";

interface OpinionResultPageProps {
	params: Promise<{
		accessKey: string;
	}>;
}

export default async function OpinionResultPage({
	params,
}: OpinionResultPageProps) {
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
				case ERROR_CODES.PARTICIPANT_MAJORITY_NOT_REACHED: {
					redirect(`/gathering/${accessKey}/opinion/pending`);
				}
				// FIXME : 서버 데이터의 정합성 이슈의 경우 어떻게 처리할지 논의 필요
				case ERROR_CODES.RESTAURANT_NOT_FOUND:
				case ERROR_CODES.CATEGORY_NOT_FOUND:
				case ERROR_CODES.GATHERING_NOT_FOUND:
				case ERROR_CODES.GATHERING_DELETED: {
					notFound();
				}
			}
		}

		throw error;
	}

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<ResultViewContainer />
		</HydrationBoundary>
	);
}
