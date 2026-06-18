import { apiClient, createApiClient } from "#/utils/api";

import {
	type GetRecommendResultResponse,
	type GetRecommendResultV2Response,
	PostProcessRecommendResultRequest,
	PostProcessRecommendResultResponse,
	type RerollRecommendResultRequest,
	type RerollRecommendResultResponse,
} from "./type";

const apiClientV2 = createApiClient({
	baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/v2`,
});

/**
 * 추천 결과 조회 API (v1)
 * @param accessKey 모임 접근키
 */
export const getRecommendResult = (accessKey: string) => {
	return apiClient.get<GetRecommendResultResponse>(
		`recommend-results/${accessKey}`,
	);
};

/**
 * 추천 결과 식당 목록 조회 API (v2) - 랜덤 뽑기용
 * @param accessKey 모임 접근키
 */
export const getRecommendResultV2 = (accessKey: string) => {
	return apiClientV2.get<GetRecommendResultV2Response>(
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
