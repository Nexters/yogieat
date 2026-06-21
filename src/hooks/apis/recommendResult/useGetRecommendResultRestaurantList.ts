import { useSuspenseQuery } from "@tanstack/react-query";

import { recommendResultOptions } from "#/apis/recommendResult";

/**
 * 랜덤 뽑기용 추천 식당 목록 조회 query hook (v2)
 */
export const useGetRecommendResultRestaurantList = (accessKey: string) => {
	return useSuspenseQuery({
		...recommendResultOptions.restaurantList(accessKey),
		select: (response) => response.data.recommendResults,
	});
};
