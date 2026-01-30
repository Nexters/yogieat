import { Region } from "./region";
import { TimeSlot } from "./timeSlot";

export type CreateMeetingStep = "people" | "date" | "region";

export interface CreateMeetingForm {
	peopleCount?: number;
	scheduledDate: string;
	timeSlot?: TimeSlot;
	region?: Region;
}
