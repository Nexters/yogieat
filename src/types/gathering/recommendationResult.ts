import type { Restaurant } from "./restaurant";

export interface VoteStatistics {
	preferences: Record<string, number>;
	dislikes: Record<string, number>;
	agreementRate: number;
}

export interface RecommendationResult {
	topRecommendation: Restaurant;
	otherCandidates: Restaurant[];
	preferences: Record<string, number>;
	dislikes: Record<string, number>;
	agreementRate: number;
}
