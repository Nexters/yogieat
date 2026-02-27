import type { RecommendationResult } from "#/types/gathering";

/** 추천 결과 조회 응답 */
export type GetRecommendResultResponse = RecommendationResult;

export type PostProcessRecommendResultRequest = {
	accessKey: string;
};

export type PostProcessRecommendResultResponse = boolean;
