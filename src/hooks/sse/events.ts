export interface ParticipantCount {
	currentCount: number;
	maxCount: number;
}

export interface GatheringFull {
	message: string;
	finalCount: number;
}

export type ParticipantCountEvent = MessageEvent<ParticipantCount>;
export type GatheringFullEvent = MessageEvent<GatheringFull>;
