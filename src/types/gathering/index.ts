export interface CreateMeetingForm {
	peopleCount?: number;
	meetingDate: string;
	timeSlot?: "LUNCH" | "DINNER";
	location?: "HONGDAE" | "GANGNAM";
}

export type TimeSlot = CreateMeetingForm["timeSlot"];
export type Location = CreateMeetingForm["location"];

// Funnel step type (useFunnel은 step 네비게이션만 담당)
export type CreateMeetingStep = "people" | "date" | "location";
