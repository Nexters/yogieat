export const EVENT = {
	GATHERING_FULL: "gathering-full",
	PARTICIPANT_COUNT: "participant-count",
} as const;

export type EventType = (typeof EVENT)[keyof typeof EVENT];
