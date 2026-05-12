import { apiClient } from "#/utils/api";

import {
	type GetRecommendResultResponse,
	PostProcessRecommendResultRequest,
	PostProcessRecommendResultResponse,
	type RerollRecommendResultRequest,
	type RerollRecommendResultResponse,
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

export const postRerollRecommendResult = (
	request: RerollRecommendResultRequest,
) => {
	return apiClient.post<
		RerollRecommendResultResponse,
		RerollRecommendResultRequest
	>(`recommend-results/reroll`, request);
};
