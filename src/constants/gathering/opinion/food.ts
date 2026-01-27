import type { FoodCategory } from "#/types/gathering";

export const FOOD_CATEGORIES: { value: FoodCategory; label: string }[] = [
	{ value: "korean", label: "한식" },
	{ value: "japanese", label: "일식" },
	{ value: "chinese", label: "중식" },
	{ value: "western", label: "양식" },
	{ value: "asian", label: "아시안" },
	{ value: "whatever", label: "상관없음" },
];

export const FOOD_CATEGORY_LABELS = Object.fromEntries(
	FOOD_CATEGORIES.map(({ value, label }) => [value, label]),
) as Record<FoodCategory, string>;
