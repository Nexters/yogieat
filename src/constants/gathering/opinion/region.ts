export enum Region {
	HONGDAE = "HONGDAE",
	GANGNAM = "GANGNAM",
	GONGDEOK = "GONGDEOK",
}

export const REGION_LABEL = {
	[Region.HONGDAE]: "홍대입구역",
	[Region.GANGNAM]: "강남역",
	[Region.GONGDEOK]: "공덕역",
};

export const REGION_LIST = [Region.GANGNAM, Region.GONGDEOK, Region.HONGDAE];
