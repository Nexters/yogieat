import { apiClient } from "#/utils/api";

import type { GetRecommendResultResponse } from "./type";

/**
 * 추천 결과 조회 API
 * @param accessKey 모임 접근키
 */
export const getRecommendResult = (accessKey: string) => {
	return apiClient.get<GetRecommendResultResponse>(
		`recommend-results/${accessKey}`,
	);
};
