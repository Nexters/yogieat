export interface MeetingContext {
	gatheringId: string;
	meetingDate: string;
	stationName: string;
	totalParticipants?: number;
	submittedCount?: number;
}

/**
 * Mock meeting data for development
 * TODO: Replace with API data fetching
 */
export const MOCK_MEETING_DATA = {
	DATE: "2026년 02월 23일 약속",
	STATION_NAME: "홍대입구역",
} as const;
