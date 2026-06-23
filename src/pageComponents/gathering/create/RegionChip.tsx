"use client";

import { useController, useFormContext } from "react-hook-form";

import type { RegionStatus } from "#/apis/region";
import { Chip } from "#/components/chip";
import type { CreateMeetingFormSchema } from "#/schemas/gathering";
interface RegionChipProps {
	value: string;
	label: string;
	status: RegionStatus;
}

export const RegionChip = ({ value, label, status }: RegionChipProps) => {
	const { control } = useFormContext<CreateMeetingFormSchema>();
	const { field } = useController({
		name: "region",
		control,
	});

	const isPendingRegion = status === "PENDING";

	const handleClick = () => {
		field.onChange(field.value === value ? null : value);
	};

	return (
		<Chip
			selected={!isPendingRegion && field.value === value}
			variant={isPendingRegion ? "dashed" : "filled"}
			disabled={isPendingRegion}
			onClick={handleClick}
		>
			{label}
		</Chip>
	);
};
