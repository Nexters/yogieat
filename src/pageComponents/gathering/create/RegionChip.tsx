"use client";

import { useFormContext, useController } from "react-hook-form";

import { Chip } from "#/components/chip";
import type { CreateMeetingForm, Region } from "#/types/gathering";

interface RegionChipProps {
	value: Region;
	label: string;
}

export const RegionChip = ({ value, label }: RegionChipProps) => {
	const { control } = useFormContext<CreateMeetingForm>();
	const { field } = useController({
		name: "region",
		control,
	});

	return (
		<Chip
			selected={field.value === value}
			onClick={() => field.onChange(value)}
		>
			{label}
		</Chip>
	);
};
