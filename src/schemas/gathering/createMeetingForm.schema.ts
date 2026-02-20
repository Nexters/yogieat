import { z } from "zod";
import { Region } from "#/constants/gathering/opinion";
import { TimeSlot } from "#/constants/gathering/create";
import {
	validateDateInput,
	DATE_ERROR_MESSAGES,
} from "#/utils/gathering/create";

const scheduledDateSchema = z.string().check((ctx) => {
	// 10자리(yyyy.MM.dd) 입력 완료 시에만 validation 수행
	// 빈 문자열이거나 입력 중일 때는 에러 표시하지 않음
	if (ctx.value.length < 10) {
		return;
	}

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
	timeSlot: z.enum(TimeSlot).nullable(),
	region: z.enum(Region).nullable(),
});

export type CreateMeetingFormSchema = z.infer<typeof createMeetingFormSchema>;
