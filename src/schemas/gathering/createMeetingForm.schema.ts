import { z } from "zod";
import type { TimeSlot, Region } from "#/types/gathering";
import {
	validateDateInput,
	type DateValidationError,
} from "#/utils/gathering/create";

const timeSlotSchema = z.enum([
	"LUNCH",
	"DINNER",
] satisfies readonly TimeSlot[]);

const regionSchema = z.enum([
	"HONGDAE",
	"GANGNAM",
	"GONGDEOK",
] satisfies readonly Region[]);

const DATE_ERROR_MESSAGES: Record<
	Exclude<DateValidationError, null>,
	string
> = {
	INVALID_FORMAT: "날짜 형식을 확인해주세요 (예: 2026.01.31)",
	INVALID_DATE: "존재하지 않는 날짜예요",
	PAST_DATE: "이미 지난 날짜예요",
};

const scheduledDateSchema = z
	.string()
	.min(1, "날짜를 입력해주세요")
	.check((ctx) => {
		const error = validateDateInput(ctx.value);
		if (error) {
			ctx.issues.push({
				code: "custom",
				message: DATE_ERROR_MESSAGES[error],
				input: ctx.value,
				path: [],
			});
		}
	});

export const createMeetingFormSchema = z.object({
	peopleCount: z.number().nullable(),
	scheduledDate: scheduledDateSchema,
	timeSlot: timeSlotSchema.nullable(),
	region: regionSchema.nullable(),
});

export type CreateMeetingFormSchema = z.infer<typeof createMeetingFormSchema>;
