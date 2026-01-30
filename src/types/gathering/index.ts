export interface CreateMeetingForm {
	peopleCount?: number;
	scheduledDate: string;
	timeSlot?: "LUNCH" | "DINNER";
	region?: "HONGDAE" | "GANGNAM";
}

export type TimeSlot = CreateMeetingForm["timeSlot"];
export type Region = CreateMeetingForm["region"];

export type CreateMeetingStep = "people" | "date" | "region";

export type DistanceRange = "RANGE_500M" | "RANGE_1KM" | "ANY";

export type FoodCategory =
	| "KOREAN"
	| "JAPANESE"
	| "CHINESE"
	| "WESTERN"
	| "ASIAN"
	| "ANY";

export type RankKey = "first" | "second" | "third";

export type PreferredMenu = Partial<Record<RankKey, FoodCategory>>;

export interface OpinionForm {
	distanceRange: DistanceRange;
	dislikedFoods: FoodCategory[];
	preferredMenus: PreferredMenu;
}

export type OpinionStep = "intro" | "distance" | "dislike" | "preference";

/**
 * @deprecated This interface will be removed in the next PR.
 * Use GetGatheringResponse from #/apis/gathering instead.
 */
export interface MeetingContext {
	accessKey: string;
	scheduledDate: string;
	stationName: string;
	totalParticipants?: number;
	submittedCount?: number;
}

export interface Restaurant {
	rank: number;
	restaurantId: number;
	restaurantName: string;
	address: string;
	rating: number;
	imageUrl: string | null;
	mapUrl: string;
	representativeReview: string;
	description: string;
	region: string | null;
	location: {
		type: string;
		coordinates: [number, number];
	};
	largeCategory: FoodCategory;
	mediumCategory: string;
	majorityDistanceRange: DistanceRange;
}

export interface VoteStatistics {
	preferences: Record<string, number>;
	dislikes: Record<string, number>;
	agreementRate: number;
}

export interface RecommendationResult {
	topRecommendation: Restaurant;
	otherCandidates: Restaurant[];
	preferences: Record<string, number>;
	dislikes: Record<string, number>;
	agreementRate: number;
}

export type {
	BaseStepProps,
	IntroStepProps,
	DistanceStepProps,
	DislikeStepProps,
	PreferenceStepProps,
} from "./stepComponents";
