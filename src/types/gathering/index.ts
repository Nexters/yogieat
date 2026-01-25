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
export type DistanceRange = "RANGE_500M" | "RANGE_1KM" | "ANY";
export type FoodCategory =
	| "KOREAN"
	| "JAPANESE"
	| "CHINESE"
	| "WESTERN"
	| "ASIAN"
	| "ANY";

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

export type {
	BaseStepProps,
	IntroStepProps,
	DistanceStepProps,
	DislikeStepProps,
} from "./stepComponents";
