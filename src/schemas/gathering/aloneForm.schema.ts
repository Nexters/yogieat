import { z } from "zod";

import {
	regionSchema,
	scheduledDateSchema,
	timeSlotSchema,
} from "./createMeetingForm.schema";
import {
	dislikedCategoriesSchema,
	preferredCategoriesSchema,
} from "./opinionForm.schema";

export const aloneFormSchema = z.object({
	scheduledDate: scheduledDateSchema,
	timeSlot: timeSlotSchema.nullable(),
	region: regionSchema.nullable(),
	dislikedCategories: dislikedCategoriesSchema,
	preferredCategories: preferredCategoriesSchema,
});

export type AloneFormSchema = z.infer<typeof aloneFormSchema>;
