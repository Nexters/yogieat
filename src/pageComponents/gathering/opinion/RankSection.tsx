"use client";

import { useFormContext, useWatch } from "react-hook-form";

import {
	Category,
	RankKey,
	RANK_LABEL,
	CATEGORY_LIST,
	RANK_LIST,
} from "#/constants/gathering/opinion";
import type { OpinionFormSchema } from "#/schemas/gathering";
import { RankChip } from "./RankChip";
import { twJoin } from "tailwind-merge";

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
				(prevRank) => data[prevRank] === Category.ANY,
			),
	});

	const dislikedCategories = useWatch({
		control,
		name: "dislikedCategories",
	});

	const availableCategories = CATEGORY_LIST.filter(
		(category) =>
			category === Category.ANY ||
			!dislikedCategories?.includes(category),
	);

	return (
		<div className="ygi:flex ygi:flex-col ygi:gap-6 ygi:py-6">
			<div className="ygi:flex ygi:items-center ygi:justify-between">
				<h2 className="ygi:heading-18-bd ygi:text-text-primary">
					{RANK_LABEL[rank]}
				</h2>
			</div>
			<div className={twJoin("ygi:flex ygi:flex-wrap ygi:gap-3")}>
				{availableCategories.map((category) => (
					<RankChip
						key={category}
						rank={rank}
						category={category}
						disabled={disabled}
					/>
				))}
			</div>
		</div>
	);
};
