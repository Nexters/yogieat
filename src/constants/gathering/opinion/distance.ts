/**
 * DistanceRange Enum (km 값)
 */
export const DISTANCE_RANGE = {
	RANGE_500M: 0.5,
	RANGE_1KM: 1,
	ANY: null,
} as const;

export type DistanceRange = keyof typeof DISTANCE_RANGE;

/**
 * DistanceRange Label
 */
export const DISTANCE_RANGE_LABEL = {
	RANGE_500M: "500m 내",
	RANGE_1KM: "1km 내",
	ANY: "상관없음",
} as const;

/**
 * DistanceRange UI 옵션
 */
export const DISTANCE_OPTIONS: ReadonlyArray<{
	value: DistanceRange;
	label: string;
	km: number | null;
}> = [
	{ value: "RANGE_500M", label: "500m 내", km: DISTANCE_RANGE.RANGE_500M },
	{ value: "RANGE_1KM", label: "1km 내", km: DISTANCE_RANGE.RANGE_1KM },
	{ value: "ANY", label: "상관없음", km: DISTANCE_RANGE.ANY },
];
