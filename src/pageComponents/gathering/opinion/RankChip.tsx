"use client";

import { useCallback } from "react";
import { useFormContext, useController } from "react-hook-form";
import { omit, drop } from "es-toolkit";

import { Chip } from "#/components/chip";
import { FOOD_CATEGORY_LABELS, RANKS } from "#/constants/gathering/opinion";
import type { FoodCategory, RankKey } from "#/types/gathering";
import type { OpinionFormSchema } from "#/schemas/gathering";
import { toast } from "#/utils/toast";

interface RankChipProps {
	rank: RankKey;
	category: FoodCategory;
	disabled: boolean;
}

export const RankChip = ({ rank, category, disabled }: RankChipProps) => {
	const { control } = useFormContext<OpinionFormSchema>();
	const { field } = useController({ name: "preferredMenus", control });

	const preferredMenus = field.value;

	const isSelected = preferredMenus[rank] === category;

	const handleClick = useCallback(() => {
		if (preferredMenus[rank] === category) {
			const newMenus = omit(preferredMenus, [rank]);
			field.onChange(newMenus);
			return;
		}

		if (category !== "ANY") {
			const existingRank = RANKS.find(
				(r) => r !== rank && preferredMenus[r] === category,
			);

			if (existingRank) {
				toast.warning("이미 선택되었어요. 다른 메뉴를 골라주세요!");
				return;
			}
		}

		let newMenus = {
			...preferredMenus,
			[rank]: category,
		} satisfies OpinionFormSchema["preferredMenus"];

		if (category === "ANY") {
			const ranksToRemove = drop(RANKS, RANKS.indexOf(rank) + 1);
			newMenus = omit(newMenus, ranksToRemove);
		}

		field.onChange(newMenus);
	}, [rank, category, preferredMenus, field]);

	return (
		<Chip selected={isSelected} disabled={disabled} onClick={handleClick}>
			{FOOD_CATEGORY_LABELS[category]}
		</Chip>
	);
};
