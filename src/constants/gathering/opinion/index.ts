import type { DistanceRange, FoodCategory, OpinionStep } from "#/types/gathering";

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
