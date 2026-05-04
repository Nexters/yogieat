import { queryOptions } from "@tanstack/react-query";

import { getRestaurantDetail } from "./api";
import { restaurantKeys } from "./queryKey";

/**
 * restaurant API QueryOption 관리
 */
export const restaurantOptions = {
	detail: (id: string) =>
		queryOptions({
			queryKey: restaurantKeys.detail(id),
			queryFn: () => getRestaurantDetail(id),
		}),
};
