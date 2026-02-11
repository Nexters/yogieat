"use client";

import { useFormContext, useController } from "react-hook-form";

import { Chip } from "#/components/chip";
import type { CreateMeetingFormSchema } from "#/schemas/gathering";
import type { Region } from "#/types/gathering";

interface RegionChipProps {
	value: Region;
	label: string;
}

export const RegionChip = ({ value, label }: RegionChipProps) => {
	const { control } = useFormContext<CreateMeetingFormSchema>();
	const { field } = useController({
		name: "region",
		control,
	});

	const handleClick = () => {
		field.onChange(field.value === value ? null : value);
	};

	return (
		<Chip selected={field.value === value} onClick={handleClick}>
			{label}
		</Chip>
	);
};
