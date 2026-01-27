export interface CreateMeetingForm {
	peopleCount?: number;
	meetingDate: string;
	timeSlot?: "lunch" | "dinner";
	location?: "hongdae" | "gangnam";
}

export type TimeSlot = CreateMeetingForm["timeSlot"];
export type Location = CreateMeetingForm["location"];

// Funnel step type (useFunnel은 step 네비게이션만 담당)
export type CreateMeetingStep = "people" | "date" | "location";

// Opinion 관련 타입
export type DistanceRange = "500m" | "1km" | "any";
export type FoodCategory =
	| "korean"
	| "japanese"
	| "chinese"
	| "western"
	| "asian"
	| "whatever";

export type RankKey = "first" | "second" | "third";

export interface OpinionForm {
	distanceRange?: DistanceRange;
	dislikedFoods: FoodCategory[];
	preferredMenus: {
		first?: FoodCategory;
		second?: FoodCategory;
		third?: FoodCategory;
	};
}

export type OpinionStep = "intro" | "distance" | "dislike" | "preference";

export interface MeetingContext {
	gatheringId: string;
	meetingDate: string;
	stationName: string;
	totalParticipants?: number;
	submittedCount?: number;
}
