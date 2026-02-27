import { REGION } from "#/constants/gathering/opinion";
import z from "zod";

export const recommendResultCreatedSchema = z.object({
	accessKey: z.string().trim().min(1),
	region: z.enum(REGION),
	peopleCount: z.number().min(0),
	currentCount: z.number().min(0),
});
