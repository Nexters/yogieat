export const DISTANCE_RANGE = {
	RANGE_500M: 0.5,
	RANGE_1KM: 1,
	ANY: null,
} as const;

export type DistanceRange = keyof typeof DISTANCE_RANGE;

/** RANGE_500M → 7분, RANGE_1KM → 15분 (도보 평균 속도 기준) */
export const DISTANCE_RANGE_WALKING_MINUTES: Record<
	Exclude<DistanceRange, "ANY">,
	number
> = {
	RANGE_500M: 7,
	RANGE_1KM: 15,
};

export const DISTANCE_OPTIONS: ReadonlyArray<{
	value: DistanceRange;
	label: string;
	km: number | null;
}> = [
	{
		value: "RANGE_500M",
		label: "도보 7분 내",
		km: DISTANCE_RANGE.RANGE_500M,
	},
	{ value: "RANGE_1KM", label: "도보 15분 내", km: DISTANCE_RANGE.RANGE_1KM },
	{ value: "ANY", label: "상관없음", km: DISTANCE_RANGE.ANY },
];
