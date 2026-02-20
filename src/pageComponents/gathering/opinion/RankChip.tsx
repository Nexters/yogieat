"use client";

import { useCallback } from "react";
import { useFormContext, useController } from "react-hook-form";
import { omit, drop } from "es-toolkit";

import { Chip } from "#/components/chip";
import {
	Category,
	CATEGORY_LABEL,
	RANK_LIST,
	RankKey,
} from "#/constants/gathering/opinion";
import type { OpinionFormSchema } from "#/schemas/gathering";
import { toast } from "#/utils/toast";

interface RankChipProps {
	rank: RankKey;
	category: Category;
	disabled: boolean;
}

export const RankChip = ({ rank, category, disabled }: RankChipProps) => {
	const { control } = useFormContext<OpinionFormSchema>();
	const { field } = useController({ name: "preferredCategories", control });

	const preferredCategories = field.value;

	const isSelected = preferredCategories?.[rank] === category;

	const handleClick = useCallback(() => {
		if (preferredCategories[rank] === category) {
			const newCategories = omit(preferredCategories, [rank]);
			field.onChange(newCategories);
			return;
		}

		if (category !== Category.ANY) {
			const existingRank = RANK_LIST.find(
				(r) => r !== rank && preferredCategories[r] === category,
			);

			if (existingRank) {
				toast.warning("이미 선택되었어요. 다른 메뉴를 골라주세요!");
				return;
			}
		}

		let newCategories = {
			...preferredCategories,
			[rank]: category,
		} satisfies OpinionFormSchema["preferredCategories"];

		if (category === Category.ANY) {
			const ranksToRemove = drop(RANK_LIST, RANK_LIST.indexOf(rank) + 1);
			newCategories = omit(newCategories, ranksToRemove);
		}

		field.onChange(newCategories);
	}, [rank, category, preferredCategories, field]);

	return (
		<Chip selected={isSelected} disabled={disabled} onClick={handleClick}>
			{CATEGORY_LABEL[category]}
		</Chip>
	);
};
