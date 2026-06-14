import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from "@tanstack/react-query";
import { notFound } from "next/navigation";

import { restaurantOptions } from "#/apis/restaurant";
import { RandomPickResultPage } from "#/pageComponents/gathering/opinion/result/randomPick";
import { ERROR_CODES, isApiError } from "#/utils/api";

interface RandomPickResultRouteProps {
	params: Promise<{
		accessKey: string;
		restaurantId: string;
	}>;
}

export default async function RandomPickResultRoute({
	params,
}: RandomPickResultRouteProps) {
	const { restaurantId } = await params;
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				retry: 0,
			},
		},
	});

	try {
		await queryClient.fetchQuery(restaurantOptions.detail(restaurantId));
	} catch (error) {
		if (isApiError(error)) {
			switch (error.errorCode) {
				case ERROR_CODES.RESTAURANT_NOT_FOUND:
					notFound();
			}
		}
		throw error;
	}

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<RandomPickResultPage />
		</HydrationBoundary>
	);
}
