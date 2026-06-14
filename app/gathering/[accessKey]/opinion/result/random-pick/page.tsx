import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from "@tanstack/react-query";
import { notFound } from "next/navigation";

import { recommendResultOptions } from "#/apis/recommendResult";
import { RecommendationResultStatus } from "#/constants/gathering/opinion";
import { RandomPickSelectPage } from "#/pageComponents/gathering/opinion/result/randomPick";
import { ERROR_CODES, isApiError } from "#/utils/api";

interface RandomPickSelectRouteProps {
	params: Promise<{
		accessKey: string;
	}>;
}

export default async function RandomPickSelectRoute({
	params,
}: RandomPickSelectRouteProps) {
	const { accessKey } = await params;
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				retry: 0,
			},
		},
	});

	try {
		const { data: recommendResult } = await queryClient.fetchQuery(
			recommendResultOptions.detail(accessKey),
		);

		if (recommendResult.status !== RecommendationResultStatus.COMPLETED) {
			notFound();
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
			<RandomPickSelectPage />
		</HydrationBoundary>
	);
}
