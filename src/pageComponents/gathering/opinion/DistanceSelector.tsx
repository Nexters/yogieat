"use client";

import { useFormContext, useController } from "react-hook-form";

import { Chip } from "#/components/chip";
import { DISTANCE_OPTIONS } from "#/constants/gathering/opinion";
import type { OpinionFormSchema } from "#/schemas/gathering";

export const DistanceSelector = () => {
	const { control } = useFormContext<OpinionFormSchema>();
	const { field } = useController({ name: "distanceRange", control });

	return (
		<div className="ygi:flex ygi:gap-3">
			{DISTANCE_OPTIONS.map((option) => (
				<Chip
					key={option.value}
					selected={field.value === option.value}
					onClick={() => {
						field.onChange(option.value);
					}}
				>
					{option.label}
				</Chip>
			))}
		</div>
	);
};
