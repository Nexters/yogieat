import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from "@tanstack/react-query";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getRestaurantDetail, restaurantOptions } from "#/apis/restaurant";
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

		const title = `[요기잇] ${restaurant.restaurantName}`;
		const description =
			restaurant.description ??
			restaurant.aiMateSummaryTitle ??
			"다인원을 위한 맛집 추천 서비스";
		const ogDescription =
			restaurant.description ??
			restaurant.aiMateSummaryTitle ??
			"[요기잇] 다인원을 위한 맛집 추천";
		const canonicalPath = `/restaurants/${id}`;

		return {
			title,
			description,
			alternates: { canonical: canonicalPath },
			openGraph: {
				title,
				description: ogDescription,
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
		// 식당 조회 실패 시 루트 layout 의 default metadata 상속
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
