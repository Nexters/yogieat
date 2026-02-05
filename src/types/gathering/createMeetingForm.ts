import { Region } from "./region";
import { TimeSlot } from "./timeSlot";

export type CreateMeetingStep = "people" | "date" | "region";

export interface CreateMeetingForm {
	peopleCount: number | null;
	scheduledDate: string;
	timeSlot: TimeSlot | null;
	region: Region | null;
}
