export const EVENT = {
	RECOMMEND_RESULT_CREATED: "recommend-result-created",
	PARTICIPANT_COUNT: "participant-count",
} as const;

export type EventType = (typeof EVENT)[keyof typeof EVENT];
