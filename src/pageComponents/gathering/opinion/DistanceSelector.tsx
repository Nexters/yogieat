"use client";

import { useFormContext, useController } from "react-hook-form";

import { Chip } from "#/components/chip";
import { DISTANCE_OPTIONS } from "#/constants/gathering/opinion";
import type { OpinionFormSchema } from "#/schemas/gathering";

/**
 * 거리 범위 선택 컴포넌트
 * - useController로 distanceRange 필드 관리
 * - Chip 컴포넌트를 사용한 단일 선택 UI
 */
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
