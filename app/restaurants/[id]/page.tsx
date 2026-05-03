import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from "@tanstack/react-query";
import { notFound } from "next/navigation";

import { restaurantOptions } from "#/apis/restaurant";
import { RestaurantDetailPage } from "#/pageComponents/restaurant/detail";
import { ERROR_CODES, isApiError } from "#/utils/api";

interface RestaurantDetailRouteProps {
	params: Promise<{
		id: string;
	}>;
}

export default async function RestaurantDetailRoute({
	params,
}: RestaurantDetailRouteProps) {
	const { id } = await params;
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				retry: 0,
			},
		},
	});

	try {
		await queryClient.fetchQuery(restaurantOptions.detail(id));
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
			<RestaurantDetailPage />
		</HydrationBoundary>
	);
}
