import type { RecommendationResultStatus } from "#/constants/gathering/opinion";
import type {
	GatheringInfo,
	RecommendationResult,
	Restaurant,
} from "#/types/gathering";

/** 추천 결과 조회 응답 (v1) */
export type GetRecommendResultResponse = RecommendationResult;

/** 추천 결과 조회 응답 (v2) */
export type GetRecommendResultV2Response = {
	status: RecommendationResultStatus;
	recommendResults: Restaurant[];
	gathering: GatheringInfo;
	preferences: Record<string, number>;
	dislikes: Record<string, number>;
	distances: Record<string, number>;
	agreementRate: number;
};

export type PostProcessRecommendResultRequest = {
	accessKey: string;
};

export type PostProcessRecommendResultResponse = boolean;

export type RerollRecommendResultRequest = {
	accessKey: string;
	restaurantIds: number[];
};

export type RerollRecommendResultResponse = {
	list: Restaurant[];
};
