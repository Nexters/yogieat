export enum Region {
	HONGDAE = "HONGDAE",
	GANGNAM = "GANGNAM",
	GONGDEOK = "GONGDEOK",
	EULJIRO3GA = "EULJIRO3GA",
	SADANG = "SADANG",
	JONGRO3GA = "JONGRO3GA",
	JAMSIL = "JAMSIL",
	SAMGAKJI = "SAMGAKJI",
}

export const REGION_LABEL = {
	[Region.HONGDAE]: "홍대입구역",
	[Region.GANGNAM]: "강남역",
	[Region.GONGDEOK]: "공덕역",
	[Region.EULJIRO3GA]: "을지로3가역",
	[Region.SADANG]: "사당역",
	[Region.JONGRO3GA]: "종로3가역",
	[Region.JAMSIL]: "잠실역",
	[Region.SAMGAKJI]: "삼각지역",
} as const;

export const REGION_LIST = [
	Region.GANGNAM,
	Region.GONGDEOK,
	Region.HONGDAE,
	Region.EULJIRO3GA,
	Region.SADANG,
	Region.JONGRO3GA,
	Region.JAMSIL,
	Region.SAMGAKJI,
];
