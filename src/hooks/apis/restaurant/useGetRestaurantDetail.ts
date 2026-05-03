import { useSuspenseQuery } from "@tanstack/react-query";

import { restaurantOptions } from "#/apis/restaurant";

/**
 * 식당 상세 조회 query hook
 *
 * 서버 응답 envelope `{ status, data }` 에서 `data` 만 추출해 반환한다.
 */
export const useGetRestaurantDetail = (id: string) => {
	return useSuspenseQuery({
		...restaurantOptions.detail(id),
		select: (response) => response.data,
	});
};
