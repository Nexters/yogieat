/**
 * @deprecated Use category.ts instead. This file will be removed in the next PR.
 */

export const FOOD_CATEGORY_LABEL = {
	KOREAN: "한식",
	JAPANESE: "일식",
	CHINESE: "중식",
	WESTERN: "양식",
	ASIAN: "아시안",
	ANY: "상관없음",
} as const;

export type FoodCategory = keyof typeof FOOD_CATEGORY_LABEL;

export const FOOD_CATEGORIES: ReadonlyArray<{
	value: FoodCategory;
	label: string;
}> = [
	{ value: "KOREAN", label: "한식" },
	{ value: "JAPANESE", label: "일식" },
	{ value: "CHINESE", label: "중식" },
	{ value: "WESTERN", label: "양식" },
	{ value: "ASIAN", label: "아시안" },
	{ value: "ANY", label: "상관없음" },
];

export const FOOD_CATEGORY_VALUES: ReadonlyArray<FoodCategory> = [
	"KOREAN",
	"JAPANESE",
	"CHINESE",
	"WESTERN",
	"ASIAN",
	"ANY",
];
