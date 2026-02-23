import type { RecommendationResultStatus } from "#/constants/gathering/opinion";
import type { Restaurant } from "./restaurant";
import type { Region } from "./region";
import type { TimeSlot } from "./timeSlot";

export interface VoteStatistics {
	preferences: Record<string, number>;
	dislikes: Record<string, number>;
	agreementRate: number;
}

export interface GatheringInfo {
	scheduledDate: string; // "YYYY-MM-DD" format
	timeSlot: TimeSlot;
	region: Region;
	peopleCount: number;
}

export interface RecommendationResult {
	status: RecommendationResultStatus;
	topRecommendation: Restaurant;
	otherCandidates: Restaurant[];
	preferences: Record<string, number>;
	dislikes: Record<string, number>;
	agreementRate: number;
	gathering: GatheringInfo;
	distances: Record<string, number>;
}
