"use client";

import { Chip } from "#/components/chip";
import { FOOD_CATEGORIES, RANK_LABELS } from "#/constants/gathering/opinion";
import type { FoodCategory, RankKey } from "#/types/gathering";
import { twJoin } from "tailwind-merge";

interface RankSectionProps {
	rank: RankKey;
	selectedMenu?: FoodCategory;
	isDisabled: boolean;
	onMenuSelect: (menu: FoodCategory) => void;
}

export const RankSection = ({
	rank,
	selectedMenu,
	isDisabled,
	onMenuSelect,
}: RankSectionProps) => {
	return (
		<div className="ygi:flex ygi:flex-col ygi:gap-xl">
			<div className="ygi:flex ygi:items-center ygi:justify-between">
				<h2 className="ygi:heading-18-bd ygi:text-text-primary">
					{RANK_LABELS[rank]}
				</h2>
			</div>
			<div
				className={twJoin(
					"ygi:flex ygi:flex-wrap ygi:gap-3",
					isDisabled && "ygi:opacity-40",
				)}
			>
				{FOOD_CATEGORIES.map((category) => (
					<Chip
						key={category.value}
						selected={selectedMenu === category.value}
						disabled={isDisabled}
						onClick={() => onMenuSelect(category.value)}
					>
						{category.label}
					</Chip>
				))}
			</div>
		</div>
	);
};
