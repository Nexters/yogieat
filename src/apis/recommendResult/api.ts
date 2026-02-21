import { apiClient } from "#/utils/api";

import {
	PostProcessRecommendResultRequest,
	PostProcessRecommendResultResponse,
	type GetRecommendResultResponse,
} from "./type";

/**
 * 추천 결과 조회 API
 * @param accessKey 모임 접근키
 */
export const getRecommendResult = (accessKey: string) => {
	return apiClient.get<GetRecommendResultResponse>(
		`recommend-results/${accessKey}`,
	);
};

export const postProcessRecommendResult = (accessKey: string) => {
	return apiClient.post<
		PostProcessRecommendResultResponse,
		PostProcessRecommendResultRequest
	>(`recommend-results/proceed`, {
		accessKey,
	});
};
