import { z } from "zod";
import type { DistanceRange, Category } from "#/constants/gathering/opinion";
import { DISTANCE_RANGE, CATEGORY } from "#/constants/gathering/opinion";
import { isUndefined } from "es-toolkit";

export const distanceRangeSchema = z.enum([
	"RANGE_500M",
	"RANGE_1KM",
	"ANY",
] satisfies readonly DistanceRange[]);

export const categorySchema = z.enum([
	"KOREAN",
	"JAPANESE",
	"CHINESE",
	"WESTERN",
	"ASIAN",
	"ANY",
] satisfies readonly Category[]);

export const nicknameSchema = z
	.string()
	.trim()
	.min(1, "이름을 입력해주세요")
	.max(8, "이름은 8자 이내로 입력해주세요")
	.regex(
		/^[가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z\s]+$/,
		"이름은 한글, 영문만 입력 가능합니다",
	);

export const dislikedCategoriesSchema = z
	.array(categorySchema)
	.min(1, "싫어하는 음식을 선택해주세요")
	.max(2, "최대 2개까지 선택 가능합니다")
	.refine(
		(categories) =>
			!categories.includes(CATEGORY.ANY) || categories.length === 1,
		{
			message: '"상관없음"은 다른 음식과 함께 선택할 수 없습니다.',
		},
	);

export const preferredCategoriesSchema = z
	.object({
		first: categorySchema.optional(),
		second: categorySchema.optional(),
		third: categorySchema.optional(),
	})
	.refine((data) => !isUndefined(data.first), {
		message: "최소 1개의 음식을 선택해주세요",
		path: ["first"],
	})
	.refine((data) => !data.second || data.first, {
		message: "1순위를 먼저 선택해주세요",
		path: ["second"],
	})
	.refine((data) => !data.third || data.second, {
		message: "2순위를 먼저 선택해주세요",
		path: ["third"],
	});

export const opinionFormSchema = z.object({
	nickname: nicknameSchema,
	distanceRange: distanceRangeSchema,
	dislikedCategories: dislikedCategoriesSchema,
	preferredCategories: preferredCategoriesSchema,
});

export type OpinionFormSchema = z.infer<typeof opinionFormSchema>;

/**
 * DistanceRange를 실제 거리(km)로 변환하는 헬퍼 함수
 */
export function distanceRangeToKm(range: DistanceRange): number | null {
	return DISTANCE_RANGE[range];
}
