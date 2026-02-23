export interface ApiErrorResponse {
	errorCode: string;
	message: string;
}

export interface ApiError {
	response?: {
		status?: number;
		data?: ApiErrorResponse;
	};
}

export function isApiError(error: unknown): error is ApiError {
	return (
		typeof error === "object" &&
		error !== null &&
		"response" in error &&
		typeof (error as ApiError).response === "object"
	);
}

export const RestaurantErrorCode = {
	RESTAURANT_COLLECTION_FAILED: "R001",
	INVALID_LOCATION_NAME: "R002",
	INVALID_CATEGORY_NAME: "R003",
	RESTAURANT_NOT_FOUND: "R004",
	CATEGORY_NOT_FOUND: "R005",
	SYNC_JOB_NOT_FOUND: "R006",
	SYNC_JOB_CONFLICT: "R007",
	RESTAURANT_SYNC_FAILED: "R008",
} as const;

export const RecommendErrorCode = {
	INVALID_CATEGORY_AGGREGATION: "REC001",
	INVALID_PREFERENCE_SCORE: "REC002",
	RECOMMEND_ALREADY_PROCEEDED: "REC003",
} as const;

export const GatheringErrorCode = {
	GATHERING_NOT_FOUND: "GA001",
	GATHERING_DELETED: "GA002",
	GATHERING_FULL: "GA003",
	GATHERING_PEOPLE_COUNT_REQUIRED: "GA004",
	GATHERING_PEOPLE_COUNT_OUT_OF_RANGE: "GA005",
	GATHERING_SCHEDULED_DATE_REQUIRED: "GA006",
	GATHERING_SCHEDULED_DATE_PAST: "GA007",
} as const;

export const ParticipantErrorCode = {
	PARTICIPANT_DISLIKES_EXCEEDED: "P001",
	PARTICIPANT_PREFERENCES_EXCEEDED: "P002",
	PARTICIPANT_NICKNAME_REQUIRED: "P003",
	PARTICIPANT_NICKNAME_TOO_LONG: "P004",
	PARTICIPANT_NICKNAME_INVALID: "P005",
	DUPLICATE_NICKNAME: "P006",
	PARTICIPANT_MAJORITY_NOT_REACHED: "P007",
} as const;

export type RestaurantErrorCode =
	(typeof RestaurantErrorCode)[keyof typeof RestaurantErrorCode];
export type RecommendErrorCode =
	(typeof RecommendErrorCode)[keyof typeof RecommendErrorCode];
export type GatheringErrorCode =
	(typeof GatheringErrorCode)[keyof typeof GatheringErrorCode];
export type ParticipantErrorCode =
	(typeof ParticipantErrorCode)[keyof typeof ParticipantErrorCode];
