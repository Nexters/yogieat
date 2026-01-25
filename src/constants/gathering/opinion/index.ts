import type {
	DistanceRange,
	FoodCategory,
	OpinionStep,
	RankKey,
} from "#/types/gathering";

// Opinion Funnel
export const OPINION_STEP_ORDER: OpinionStep[] = [
	"intro",
	"distance",
	"dislike",
	"preference",
];

export const OPINION_TOTAL_STEPS = 3;

// Distance options
export const DISTANCE_OPTIONS: { value: DistanceRange; label: string }[] = [
	{ value: "500m", label: "500m 내" },
	{ value: "1km", label: "1km 내" },
	{ value: "any", label: "상관없음" },
];

// Food category options
export const FOOD_CATEGORIES: { value: FoodCategory; label: string }[] = [
	{ value: "korean", label: "한식" },
	{ value: "japanese", label: "일식" },
	{ value: "chinese", label: "중식" },
	{ value: "western", label: "양식" },
	{ value: "asian", label: "아시안" },
];

export const FOOD_CATEGORY_LABELS: Record<FoodCategory, string> = {
	korean: "한식",
	japanese: "일식",
	chinese: "중식",
	western: "양식",
	asian: "아시안",
	none: "상관없음",
};

export const DISTANCE_LABELS: Record<DistanceRange, string> = {
	"500m": "500m 내",
	"1km": "1km 내",
	any: "상관없음",
};

// Rank related constants
export const RANKS: RankKey[] = ["first", "second", "third"];

export const RANK_LABELS: Record<RankKey, string> = {
	first: "1순위",
	second: "2순위",
	third: "3순위",
};

// Special options
export const NO_CARE_LABEL = "상관없음";

// UI Text for each step
export const UI_TEXT = {
	distance: {
		title: "기준으로\n얼마나 먼 곳까지 갈 수 있나요?",
		description: "설문 결과를 바탕으로 최적의 장소를 추천해드려요",
	},
	dislike: {
		title: "싫어하는\n음식 종류를 선택해주세요",
		description: "선호 조사가 끝나면 추천을 시작할게요",
	},
	preference: {
		title: "선호하는\n음식 종류 순위를 정해주세요",
		description: "중복 선택은 불가능해요",
	},
} as const;

// Re-export meeting context
export type { MeetingContext } from "./meeting";
export { MOCK_MEETING_DATA } from "./meeting";
