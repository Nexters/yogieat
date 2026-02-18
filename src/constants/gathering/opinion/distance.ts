export enum DistanceRange {
	RANGE_500M = "RANGE_500M",
	RANGE_1KM = "RANGE_1KM",
	ANY = "ANY",
}

export const DISTANCE_RANGE_LABEL = {
	[DistanceRange.RANGE_500M]: "500m 내",
	[DistanceRange.RANGE_1KM]: "1km 내",
	[DistanceRange.ANY]: "상관없음",
};

export const DISTANCE_RANGE_KM: Record<DistanceRange, number | null> = {
	[DistanceRange.RANGE_500M]: 0.5,
	[DistanceRange.RANGE_1KM]: 1,
	[DistanceRange.ANY]: null,
};

export const DISTANCE_LIST = [
	DistanceRange.RANGE_500M,
	DistanceRange.RANGE_1KM,
	DistanceRange.ANY,
];
