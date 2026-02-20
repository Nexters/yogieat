import { z } from "zod";
import { Region } from "#/constants/gathering/opinion";
import { TimeSlot } from "#/constants/gathering/create";
import {
	validateDateInput,
	DATE_ERROR_MESSAGES,
} from "#/utils/gathering/create";

export const peopleCountSchema = z.number().nullable();

export const timeSlotSchema = z.enum(TimeSlot);

export const regionSchema = z.enum(Region);

export const scheduledDateSchema = z.string().check((ctx) => {
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
	peopleCount: peopleCountSchema,
	scheduledDate: scheduledDateSchema,
	timeSlot: timeSlotSchema,
	region: regionSchema,
});

export type CreateMeetingFormSchema = z.infer<typeof createMeetingFormSchema>;
