import { useCallback } from "react";
import { useController } from "react-hook-form";
import type { Control } from "react-hook-form";
import type { FoodCategory, RankKey } from "#/types/gathering";
import type { OpinionFormSchema } from "#/schemas/gathering";
import { RANKS } from "#/constants/gathering/opinion";
import { toast } from "#/utils/toast";

export function usePreferenceStep(control: Control<OpinionFormSchema>) {
	const { field } = useController({
		name: "preferredMenus",
		control,
	});

	const preferredMenus = field.value || {};

	const handleMenuSelect = useCallback(
		(rank: RankKey, menu: FoodCategory) => {
			if (menu !== "ANY") {
				const existingRank = RANKS.find(
					(r) => r !== rank && preferredMenus[r] === menu,
				);
				if (existingRank) {
					toast.warning("이미 선택되었어요. 다른 메뉴를 골라주세요!");
					return;
				}
			}

			let newMenus = { ...preferredMenus, [rank]: menu };

			if (menu === "ANY") {
				const rankIndex = RANKS.indexOf(rank);
				const ranksToRemove = RANKS.slice(rankIndex + 1);
				newMenus = Object.fromEntries(
					Object.entries(newMenus).filter(
						([key]) => !ranksToRemove.includes(key as RankKey),
					),
				) as OpinionFormSchema["preferredMenus"];
			}

			field.onChange(newMenus);
		},
		[preferredMenus, field],
	);

	const isRankDisabled = useCallback(
		(rank: RankKey): boolean => {
			const rankIndex = RANKS.indexOf(rank);
			return RANKS.slice(0, rankIndex).some(
				(prevRank) => preferredMenus[prevRank] === "ANY",
			);
		},
		[preferredMenus],
	);

	const isValid = useCallback((): boolean => {
		const { first, second, third } = preferredMenus;

		if (!first) return false;

		if (first === "ANY") return !second && !third;

		if (!second) return false;

		if (second === "ANY") return !third;

		return !!third;
	}, [preferredMenus]);

	return {
		preferredMenus,
		handleMenuSelect,
		isRankDisabled,
		isValid: isValid(),
	};
}
