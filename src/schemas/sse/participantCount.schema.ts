import z from "zod";

export const participantCountSchema = z.object({
	maxCount: z.number().positive(),
	currentCount: z.number().positive(),
});
