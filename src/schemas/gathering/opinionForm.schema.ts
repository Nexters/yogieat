import { z } from "zod";
import { Category, DistanceRange } from "#/constants/gathering/opinion";

export const opinionFormSchema = z.object({
	nickname: z
		.string()
		.trim()
		.min(1, "이름을 입력해주세요")
		.max(8, "이름은은 8자 이내로 입력해주세요")
		.regex(
			/^[가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z\s]+$/,
			"이름은 한글, 영문만 입력 가능합니다",
		),
	distanceRange: z.enum(DistanceRange),
	dislikedCategories: z
		.array(z.enum(Category))
		.min(1, "싫어하는 음식을 선택해주세요")
		.max(2, "최대 2개까지 선택 가능합니다")
		.refine(
			(categories) =>
				!categories.includes(Category.ANY) || categories.length === 1,
			{
				message: '"상관없음" 은 다른 음식과 함께 선택할 수 없습니다.',
			},
		),
	preferredCategories: z.object({
		first: z.enum(Category).optional(),
		second: z.enum(Category).optional(),
		third: z.enum(Category).optional(),
	}),
});

export type OpinionFormSchema = z.infer<typeof opinionFormSchema>;
