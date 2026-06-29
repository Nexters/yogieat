"use client";

import { useController, useFormContext } from "react-hook-form";

import type { RegionStatus } from "#/apis/region";
import { Chip } from "#/components/chip";
import type { CreateMeetingFormSchema } from "#/schemas/gathering";
import { toast } from "#/utils/toast";
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
		if (isPendingRegion) {
			toast.warning("곧 추가될 지역입니다. 조금만 기다려주세요!");
			return;
		}
		field.onChange(field.value === value ? null : value);
	};

	return (
		<Chip
			selected={!isPendingRegion && field.value === value}
			variant={isPendingRegion ? "dashed" : "filled"}
			aria-disabled={isPendingRegion}
			onClick={handleClick}
		>
			{label}
		</Chip>
	);
};
