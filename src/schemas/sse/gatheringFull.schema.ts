import z from "zod";

export const gatheringFullSchema = z.object({
	maxCount: z.number().positive(),
	currentCount: z.number().positive(),
});
