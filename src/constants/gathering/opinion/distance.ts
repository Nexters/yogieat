import type { DistanceRange } from "#/types/gathering";

export const DISTANCE_OPTIONS: { value: DistanceRange; label: string }[] = [
	{ value: "RANGE_500M", label: "500m 내" },
	{ value: "RANGE_1KM", label: "1km 내" },
	{ value: "ANY", label: "상관없음" },
];

export const DISTANCE_LABELS = Object.fromEntries(
	DISTANCE_OPTIONS.map(({ value, label }) => [value, label]),
) as Record<DistanceRange, string>;
