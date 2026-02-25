"use client";

import { useFormContext, useWatch } from "react-hook-form";

import {
	CATEGORY,
	RANK_LABEL,
	CATEGORY_LIST,
	RANK_LIST,
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
		name: "preferredCategories",
		compute: (data) =>
			RANK_LIST.slice(0, RANK_LIST.indexOf(rank)).some(
				(prevRank) => data[prevRank] === CATEGORY.ANY,
			),
	});

	const availableCategories = useWatch({
		control,
		name: "dislikedCategories",
		compute: (dislikedCategories) =>
			CATEGORY_LIST.filter(
				(category) =>
					category.value === CATEGORY.ANY ||
					!dislikedCategories?.includes(category.value),
			),
	});

	return (
		<div className="ygi:flex ygi:flex-col ygi:gap-6 ygi:py-6">
			<div className="ygi:flex ygi:items-center ygi:justify-between">
				<h2 className="ygi:heading-18-bd ygi:text-text-primary">
					{RANK_LABEL[rank]}
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
