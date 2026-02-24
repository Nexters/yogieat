"use client";

import { useFormContext, useWatch } from "react-hook-form";

import {
	RANK_LABELS,
	FOOD_CATEGORIES,
	RANKS,
} from "#/constants/gathering/opinion";
import type { RankKey } from "#/types/gathering";
import type { OpinionFormSchema } from "#/schemas/gathering";
import { RankChip } from "./RankChip";

interface RankSectionProps {
	rank: RankKey;
}

export const RankSection = ({ rank }: RankSectionProps) => {
	const { control } = useFormContext<OpinionFormSchema>();

	const disabled = useWatch({
		control,
		name: "preferredMenus",
		compute: (data) =>
			RANKS.slice(0, RANKS.indexOf(rank)).some(
				(prevRank) => data[prevRank] === "ANY",
			),
	});

	const availableCategories = useWatch({
		control,
		name: "dislikedFoods",
		compute: (dislikedFoods) =>
			FOOD_CATEGORIES.filter(
				(category) =>
					category.value === "ANY" ||
					!dislikedFoods?.includes(category.value),
			),
	});

	return (
		<div className="ygi:flex ygi:flex-col ygi:gap-6 ygi:py-6">
			<div className="ygi:flex ygi:items-center ygi:justify-between">
				<h2 className="ygi:heading-18-bd ygi:text-text-primary">
					{RANK_LABELS[rank]}
				</h2>
			</div>
			<div className="ygi:flex ygi:flex-wrap ygi:gap-3">
				{availableCategories.map((category) => (
					<RankChip
						key={category.value}
						rank={rank}
						category={category.value}
						disabled={disabled}
					/>
				))}
			</div>
		</div>
	);
};
