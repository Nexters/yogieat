export enum TimeSlot {
	LUNCH = "LUNCH",
	DINNER = "DINNER",
}

export const TIME_SLOT_LABEL = {
	[TimeSlot.LUNCH]: "점심",
	[TimeSlot.DINNER]: "저녁",
};

export const TIME_SLOT_LIST: TimeSlot[] = [TimeSlot.LUNCH, TimeSlot.DINNER];
