import z from "zod";

export const recommendResultCreatedSchema = z.object({
	accessKey: z.string().trim().min(1),
	region: z.string(),
	peopleCount: z.number().min(0),
	currentCount: z.number().min(0),
});
