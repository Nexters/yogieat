import { z } from "zod";

import { regionSchema } from "./createMeetingForm.schema";
import { preferredCategoriesSchema } from "./opinionForm.schema";

export const aloneFormSchema = z.object({
	region: regionSchema.nullable(),
	preferredCategories: preferredCategoriesSchema,
});

export type AloneFormSchema = z.infer<typeof aloneFormSchema>;
