export const REGION = {
	HONGDAE: "HONGDAE",
	GANGNAM: "GANGNAM",
	GONGDEOK: "GONGDEOK",
} as const;

export type Region = (typeof REGION)[keyof typeof REGION];

export const REGION_LABEL = {
	HONGDAE: "홍대입구역",
	GANGNAM: "강남역",
	GONGDEOK: "공덕역",
} as const;

export const REGION_OPTIONS: ReadonlyArray<{
	value: Region;
	label: string;
}> = [
	{ value: REGION.GANGNAM, label: REGION_LABEL.GANGNAM },
	{ value: REGION.GONGDEOK, label: REGION_LABEL.GONGDEOK },
	{ value: REGION.HONGDAE, label: REGION_LABEL.HONGDAE },
];
