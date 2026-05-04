import { MOCK_RESTAURANT_DETAIL } from "#/constants/restaurant";
import type { ApiResponse } from "#/utils/api";

import { type GetRestaurantDetailResponse } from "./type";

/**
 * 식당 상세 조회 API
 * @param id 식당 ID
 *
 * TODO(API 연동): 백엔드 완성 시 아래 주석 라인으로 교체
 * (매개변수 `_id`도 `id`로 함께 변경)
 * return apiClient.get<GetRestaurantDetailResponse>(`restaurants/${id}`);
 */
export const getRestaurantDetail = (
	_id: string,
): Promise<ApiResponse<GetRestaurantDetailResponse>> => {
	return Promise.resolve({
		status: 200,
		data: MOCK_RESTAURANT_DETAIL,
		timestamp: new Date().toISOString(),
	});
};
