import { apiClient } from "#/utils/api";

import { type GetRestaurantDetailResponse } from "./type";

/**
 * 식당 상세 조회 API
 * @param id 식당 ID
 */
export const getRestaurantDetail = (id: string) => {
	return apiClient.get<GetRestaurantDetailResponse>(`restaurants/${id}`);
};
