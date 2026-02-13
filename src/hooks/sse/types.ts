export interface ParticipantCountEvent {
	currentCount: number;
	maxCount: number;
}

export interface GatheringFullEvent {
	message: string;
	finalCount: number;
}
