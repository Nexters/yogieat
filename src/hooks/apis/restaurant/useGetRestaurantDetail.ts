import { useSuspenseQuery } from "@tanstack/react-query";

import { restaurantOptions } from "#/apis/restaurant";

/**
 * 식당 상세 조회 query hook
 */
export const useGetRestaurantDetail = (id: string) => {
	return useSuspenseQuery(restaurantOptions.detail(id));
};
