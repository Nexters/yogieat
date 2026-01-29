import { useCallback } from "react";
import { useController } from "react-hook-form";
import type { Control } from "react-hook-form";
import type { FoodCategory, RankKey } from "#/types/gathering";
import type { OpinionFormSchema } from "#/schemas/gathering";
import { RANKS } from "#/constants/gathering/opinion";
import { toast } from "#/utils/toast";

/**
 * PreferenceStep의 상태 및 복잡한 로직을 관리하는 custom hook
 */
export function usePreferenceStep(control: Control<OpinionFormSchema>) {
	const { field } = useController({
		name: "preferredMenus",
		control,
	});

	const preferredMenus = field.value || {};

	/**
	 * 메뉴 선택 핸들러
	 * - 중복 선택 방지
	 * - "ANY" 선택 시 하위 rank 자동 제거
	 * - 선택 해제 없음 (다른 메뉴 선택으로만 변경)
	 */
	const handleMenuSelect = useCallback(
		(rank: RankKey, menu: FoodCategory) => {
			// 중복 체크 (선택 해제 없음)
			if (menu !== "ANY") {
				const existingRank = RANKS.find(
					(r) => r !== rank && preferredMenus[r] === menu,
				);
				if (existingRank) {
					toast.warning("이미 선택되었어요. 다른 메뉴를 골라주세요!");
					return;
				}
			}

			// 새 메뉴 설정
			let newMenus = { ...preferredMenus, [rank]: menu };

			// "ANY" 선택 시 하위 rank 제거
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

	/**
	 * 특정 rank가 비활성화되어야 하는지 확인
	 * 상위 rank에 "ANY"가 있으면 비활성화
	 */
	const isRankDisabled = useCallback(
		(rank: RankKey): boolean => {
			const rankIndex = RANKS.indexOf(rank);
			return RANKS.slice(0, rankIndex).some(
				(prevRank) => preferredMenus[prevRank] === "ANY",
			);
		},
		[preferredMenus],
	);

	/**
	 * 폼 완료 가능 여부 검증
	 * - 1순위 필수
	 * - 1순위가 "ANY"면 완료 가능
	 * - 그 외: 2순위 필수
	 * - 2순위가 "ANY"면 완료 가능
	 * - 그 외: 3순위 필수
	 */
	const isValid = useCallback((): boolean => {
		const { first, second, third } = preferredMenus;

		// 1순위 필수
		if (!first) return false;

		// 1순위가 "ANY"면 2, 3순위 없어야 함
		if (first === "ANY") return !second && !third;

		// 2순위 필수
		if (!second) return false;

		// 2순위가 "ANY"면 3순위 없어야 함
		if (second === "ANY") return !third;

		// 3순위 필수
		return !!third;
	}, [preferredMenus]);

	return {
		preferredMenus,
		handleMenuSelect,
		isRankDisabled,
		isValid: isValid(),
	};
}
