export const RecommendationResultStatus = {
	PENDING: "PENDING",
	COMPLETED: "COMPLETED",
	FAILED: "FAILED",
} as const;

export type RecommendationResultStatus =
	(typeof RecommendationResultStatus)[keyof typeof RecommendationResultStatus];
