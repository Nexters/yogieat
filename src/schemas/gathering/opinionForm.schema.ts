import { z } from "zod";
import type { DistanceRange, FoodCategory } from "#/types/gathering";
import { DISTANCE_RANGE } from "#/constants/gathering/opinion";

const distanceRangeSchema = z.enum([
	"RANGE_500M",
	"RANGE_1KM",
	"ANY",
] satisfies readonly DistanceRange[]);

export const foodCategorySchema = z.enum([
	"KOREAN",
	"JAPANESE",
	"CHINESE",
	"WESTERN",
	"ASIAN",
	"ANY",
] satisfies readonly FoodCategory[]);

export const opinionFormSchema = z.object({
	distanceRange: distanceRangeSchema,
	dislikedFoods: z
		.array(foodCategorySchema)
		.min(1, "싫어하는 음식을 선택해주세요")
		.max(2, "최대 2개까지 선택 가능합니다"),
	preferredMenus: z.object({
		first: foodCategorySchema.optional(),
		second: foodCategorySchema.optional(),
		third: foodCategorySchema.optional(),
	}),
});

export type OpinionFormSchema = z.infer<typeof opinionFormSchema>;

/**
 * DistanceRange를 실제 거리(km)로 변환하는 헬퍼 함수
 */
export function distanceRangeToKm(range: DistanceRange): number | null {
	return DISTANCE_RANGE[range];
}
