import { MOCK_RESTAURANT_DETAIL } from "#/constants/restaurant";
import { apiClient, type ApiResponse } from "#/utils/api";

import { type GetRestaurantDetailResponse } from "./type";

/**
 * 식당 상세 조회 API
 * @param id 식당 ID
 *
 * 임시: API 호출 실패 시 mock 데이터로 fallback 한다.
 * API 안정성 확인 후 try/catch 와 mock fallback 은 제거할 예정.
 */
export const getRestaurantDetail = async (
	id: string,
): Promise<ApiResponse<GetRestaurantDetailResponse>> => {
	try {
		return await apiClient.get<GetRestaurantDetailResponse>(
			`restaurants/${id}`,
		);
	} catch (error) {
		console.warn(
			"[getRestaurantDetail] API 호출 실패, mock 데이터로 fallback:",
			error,
		);
		return {
			status: 200,
			data: MOCK_RESTAURANT_DETAIL,
			timestamp: new Date().toISOString(),
		};
	}
};
