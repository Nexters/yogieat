import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from "@tanstack/react-query";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getRestaurantDetail, restaurantOptions } from "#/apis/restaurant";
import { CATEGORY_LABEL } from "#/constants/gathering/opinion";
import { RestaurantDetailPage } from "#/pageComponents/restaurant/detail";
import { ERROR_CODES, isApiError } from "#/utils/api";

interface RestaurantDetailRouteProps {
	params: Promise<{
		id: string;
	}>;
}

export async function generateMetadata({
	params,
}: RestaurantDetailRouteProps): Promise<Metadata> {
	const { id } = await params;

	try {
		const { data: restaurant } = await getRestaurantDetail(id);

		const title = `${restaurant.restaurantName} | ${CATEGORY_LABEL[restaurant.largeCategory]}`;
		const description = "[요기잇] 추천 맛집을 확인해보세요.";
		const canonicalPath = `/restaurants/${id}`;

		return {
			title,
			description,
			alternates: { canonical: canonicalPath },
			openGraph: {
				title,
				description,
				type: "website",
				locale: "ko_KR",
				siteName: "요기잇",
				url: canonicalPath,
				...(restaurant.imageUrl && {
					images: [
						{
							url: restaurant.imageUrl,
							alt: restaurant.restaurantName,
						},
					],
				}),
			},
		};
	} catch {
		return {};
	}
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
