import type { FoodCategory } from "#/types/gathering";

export const FOOD_CATEGORIES: { value: FoodCategory; label: string }[] = [
	{ value: "KOREAN", label: "한식" },
	{ value: "JAPANESE", label: "일식" },
	{ value: "CHINESE", label: "중식" },
	{ value: "WESTERN", label: "양식" },
	{ value: "ASIAN", label: "아시안" },
	{ value: "ANY", label: "상관없음" },
];

export const FOOD_CATEGORY_LABELS = Object.fromEntries(
	FOOD_CATEGORIES.map(({ value, label }) => [value, label]),
) as Record<FoodCategory, string>;
