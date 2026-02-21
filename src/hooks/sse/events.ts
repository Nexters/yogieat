export interface ParticipantCountMessage {
	currentCount: number;
	maxCount: number;
}

export interface GatheringFullMessage {
	message: string;
	finalCount: number;
}
