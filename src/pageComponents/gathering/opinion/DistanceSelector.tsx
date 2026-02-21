"use client";

import { useFormContext, useController } from "react-hook-form";

import { Chip } from "#/components/chip";
import {
	DISTANCE_LIST,
	DISTANCE_RANGE_LABEL,
} from "#/constants/gathering/opinion";
import type { OpinionFormSchema } from "#/schemas/gathering";

export const DistanceSelector = () => {
	const { control } = useFormContext<OpinionFormSchema>();
	const { field } = useController({ name: "distanceRange", control });

	return (
		<div className="ygi:flex ygi:gap-3">
			{DISTANCE_LIST.map((distance) => (
				<Chip
					key={distance}
					selected={field.value === distance}
					onClick={() => {
						field.onChange(distance);
					}}
				>
					{DISTANCE_RANGE_LABEL[distance]}
				</Chip>
			))}
		</div>
	);
};
