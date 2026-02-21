export const REGION = {
	HONGDAE: "HONGDAE",
	GANGNAM: "GANGNAM",
	GONGDEOK: "GONGDEOK",
	EULJIRO3GA: "EULJIRO3GA",
	SADANG: "SADANG",
	JONGNO3GA: "JONGNO3GA",
	JAMSIL: "JAMSIL",
	SAMGAKJI: "SAMGAKJI",
} as const;

export type Region = (typeof REGION)[keyof typeof REGION];

export const REGION_LABEL = {
	HONGDAE: "홍대입구역",
	GANGNAM: "강남역",
	GONGDEOK: "공덕역",
	EULJIRO3GA: "을지로3가역",
	SADANG: "사당역",
	JONGNO3GA: "종로3가역",
	JAMSIL: "잠실역",
	SAMGAKJI: "삼각지역",
} as const;

export const REGION_OPTIONS: ReadonlyArray<{
	value: Region;
	label: string;
}> = [
	{ value: REGION.GANGNAM, label: REGION_LABEL.GANGNAM },
	{ value: REGION.GONGDEOK, label: REGION_LABEL.GONGDEOK },
	{ value: REGION.SADANG, label: REGION_LABEL.SADANG },
	{ value: REGION.SAMGAKJI, label: REGION_LABEL.SAMGAKJI },
	{ value: REGION.EULJIRO3GA, label: REGION_LABEL.EULJIRO3GA },
	{ value: REGION.JAMSIL, label: REGION_LABEL.JAMSIL },
	{ value: REGION.JONGNO3GA, label: REGION_LABEL.JONGNO3GA },
	{ value: REGION.HONGDAE, label: REGION_LABEL.HONGDAE },
];
