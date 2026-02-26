import z from "zod";

export const gatheringFullSchema = z.object({
	maxCount: z.number().min(0),
	currentCount: z.number().min(0),
});
