import { z } from "zod";
import { Category, DistanceRange } from "#/constants/gathering/opinion";
import { isUndefined } from "es-toolkit";

export const distanceRangeSchema = z.enum(DistanceRange);

export const foodCategorySchema = z.enum(Category);

export const nicknameSchema = z
	.string()
	.trim()
	.min(1, "이름을 입력해주세요")
	.max(8, "이름은은 8자 이내로 입력해주세요")
	.regex(
		/^[가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z\s]+$/,
		"이름은 한글, 영문만 입력 가능합니다",
	);

export const dislikedCategoriesSchema = z
	.array(foodCategorySchema)
	.min(1, "싫어하는 음식을 선택해주세요")
	.max(2, "최대 2개까지 선택 가능합니다")
	.refine((foods) => !foods.includes(Category.ANY) || foods.length === 1, {
		message: '"상관없음"은 다른 음식과 함께 선택할 수 없습니다.',
	});

export const preferredCategoriesSchema = z
	.object({
		first: foodCategorySchema.optional(),
		second: foodCategorySchema.optional(),
		third: foodCategorySchema.optional(),
	})
	.refine((data) => !isUndefined(data.first), {
		message: "최소 1개의 음식을 선택해주세요",
		path: ["first"],
	});

export const opinionFormSchema = z.object({
	nickname: nicknameSchema,
	distanceRange: distanceRangeSchema,
	dislikedCategories: dislikedCategoriesSchema,
	preferredCategories: preferredCategoriesSchema,
});

export type OpinionFormSchema = z.infer<typeof opinionFormSchema>;
