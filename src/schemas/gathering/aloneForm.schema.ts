import { z } from "zod";

import { regionSchema } from "./createMeetingForm.schema";
import {
	dislikedCategoriesSchema,
	preferredCategoriesSchema,
} from "./opinionForm.schema";

export const aloneFormSchema = z.object({
	region: regionSchema.nullable(),
	dislikedCategories: dislikedCategoriesSchema,
	preferredCategories: preferredCategoriesSchema,
});

export type AloneFormSchema = z.infer<typeof aloneFormSchema>;
