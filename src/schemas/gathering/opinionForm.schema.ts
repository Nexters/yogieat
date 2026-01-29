import { z } from "zod";
import type { DistanceRange } from "#/types/gathering";

const distanceRangeSchema = z.enum(["RANGE_500M", "RANGE_1KM", "ANY"]);

export const foodCategorySchema = z.enum([
	"KOREAN",
	"JAPANESE",
	"CHINESE",
	"WESTERN",
	"ASIAN",
	"ANY",
]);

export const opinionFormSchema = z.object({
	distanceRange: distanceRangeSchema,
	dislikedFoods: z
		.array(foodCategorySchema)
		.min(1, "싫어하는 음식을 선택해주세요"),
	preferredMenus: z
		.object({
			first: foodCategorySchema.optional(),
			second: foodCategorySchema.optional(),
			third: foodCategorySchema.optional(),
		})
		.superRefine((data, ctx) => {
			const { first, second, third } = data;

			// 1순위 필수
			if (!first) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: "1순위를 선택해주세요",
					path: ["first"],
				});
				return;
			}

			// 1순위가 "ANY"인 경우, 2순위와 3순위가 없어야 함
			if (first === "ANY") {
				if (second || third) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: "상관없음을 선택하면 하위 순위를 선택할 수 없습니다",
						path: ["second"],
					});
				}
				return;
			}

			// 2순위 필수 (1순위가 "ANY"가 아닌 경우)
			if (!second) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: "2순위를 선택해주세요",
					path: ["second"],
				});
				return;
			}

			// 1순위와 2순위 중복 체크
			if (first === second) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: "이미 선택된 메뉴입니다",
					path: ["second"],
				});
				return;
			}

			// 2순위가 "ANY"인 경우, 3순위가 없어야 함
			if (second === "ANY") {
				if (third) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: "상관없음을 선택하면 하위 순위를 선택할 수 없습니다",
						path: ["third"],
					});
				}
				return;
			}

			// 3순위 필수 (2순위가 "ANY"가 아닌 경우)
			if (!third) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: "3순위를 선택해주세요",
					path: ["third"],
				});
				return;
			}

			// 1순위, 2순위, 3순위 중복 체크
			if (first === third || second === third) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: "이미 선택된 메뉴입니다",
					path: ["third"],
				});
			}
		}),
});

export type OpinionFormSchema = z.infer<typeof opinionFormSchema>;

/**
 * DistanceRange를 실제 거리(km)로 변환하는 헬퍼 함수
 */
export function distanceRangeToKm(range: DistanceRange): number {
	switch (range) {
		case "RANGE_500M":
			return 0.5;
		case "RANGE_1KM":
			return 1.0;
		case "ANY":
			return 999;
	}
}
