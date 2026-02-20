import { z } from "zod";
import type { DistanceRange, FoodCategory } from "#/types/gathering";
import { DISTANCE_RANGE } from "#/constants/gathering/opinion";

export const distanceRangeSchema = z.enum([
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

export const nicknameSchema = z
	.string()
	.trim()
	.min(1, "이름을 입력해주세요")
	.max(8, "이름은은 8자 이내로 입력해주세요")
	.regex(
		/^[가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z\s]+$/,
		"이름은 한글, 영문만 입력 가능합니다",
	);

export const dislikedFoodSchema = z
	.array(foodCategorySchema)
	.min(1, "싫어하는 음식을 선택해주세요")
	.max(2, "최대 2개까지 선택 가능합니다")
	.refine((foods) => !foods.includes("ANY") || foods.length === 1, {
		message: '"상관없음"은 다른 음식과 함께 선택할 수 없습니다.',
	});

export const preferredMenusSchema = z
	.object({
		first: foodCategorySchema.optional(),
		second: foodCategorySchema.optional(),
		third: foodCategorySchema.optional(),
	})
	.refine((data) => data.first !== undefined, {
		message: "최소 1개의 음식을 선택해주세요",
		path: ["first"],
	});

export const opinionFormSchema = z.object({
	nickname: nicknameSchema,
	distanceRange: distanceRangeSchema,
	dislikedFoods: dislikedFoodSchema,
	preferredMenus: preferredMenusSchema,
});

export type OpinionFormSchema = z.infer<typeof opinionFormSchema>;

/**
 * DistanceRange를 실제 거리(km)로 변환하는 헬퍼 함수
 */
export function distanceRangeToKm(range: DistanceRange): number | null {
	return DISTANCE_RANGE[range];
}
