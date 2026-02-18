export enum Category {
	KOREAN = "KOREAN",
	JAPANESE = "JAPANESE",
	CHINESE = "CHINESE",
	WESTERN = "WESTERN",
	ASIAN = "ASIAN",
	ANY = "ANY",
}

export const CATEGORY_LABEL = {
	[Category.KOREAN]: "한식",
	[Category.JAPANESE]: "일식",
	[Category.CHINESE]: "중식",
	[Category.WESTERN]: "양식",
	[Category.ASIAN]: "아시안",
	[Category.ANY]: "상관없음",
};

export const CATEGORY_LIST = [
	Category.KOREAN,
	Category.JAPANESE,
	Category.CHINESE,
	Category.WESTERN,
	Category.ASIAN,
	Category.ANY,
];
