import { z } from "zod";

export const feedbackFormSchema = z.object({
	message: z
		.string()
		.trim()
		.min(1, "의견을 입력해주세요")
		.max(1000, "1000자 이내로 입력해주세요"),
});

export type FeedbackFormSchema = z.infer<typeof feedbackFormSchema>;
