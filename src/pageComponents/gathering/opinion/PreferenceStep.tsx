"use client";

import { useCallback } from "react";
import { useFormContext, Controller } from "react-hook-form";

import { Layout } from "#/components/layout";
import { StepIndicator } from "#/components/stepIndicator/StepIndicator";
import { StepHeader } from "#/components/stepHeader";
import { Button } from "#/components/button/Button";
import { RANKS, OPINION_TOTAL_STEPS } from "#/constants/gathering/opinion";
import { toast } from "#/utils/toast";
import { RankSection } from "./RankSection";
import type {
	OpinionForm,
	FoodCategory,
	PreferenceStepProps,
} from "#/types/gathering";
import type { RankKey } from "#/constants/gathering/opinion";

export const PreferenceStepContent = () => {
	const { control } = useFormContext<OpinionForm>();

	const isNoneSelected = useCallback(
		(rank: RankKey, preferredMenus: OpinionForm["preferredMenus"]) => {
			return preferredMenus[rank] === "none";
		},
		[],
	);

	const isDisabled = useCallback(
		(rank: RankKey, preferredMenus: OpinionForm["preferredMenus"]) => {
			const rankIndex = RANKS.indexOf(rank);
			return RANKS.slice(0, rankIndex).some((prevRank) =>
				isNoneSelected(prevRank, preferredMenus),
			);
		},
		[isNoneSelected],
	);

	return (
		<div className="ygi:flex ygi:flex-col ygi:gap-8 ygi:px-6 ygi:pt-3">
			<StepIndicator currentStep={3} totalSteps={OPINION_TOTAL_STEPS} />
			<StepHeader.Root>
				<StepHeader.Title>먹고 싶은 음식을 골라주세요</StepHeader.Title>
			</StepHeader.Root>

			<Controller
				name="preferredMenus"
				control={control}
				render={({ field }) => {
					const preferredMenus = field.value || {};

					const handleMenuSelect = (
						rank: RankKey,
						menu: FoodCategory,
					) => {
						if (preferredMenus[rank] === menu) {
							const newMenus = { ...preferredMenus };
							delete newMenus[rank];
							field.onChange(newMenus);
							return;
						}

						if (menu !== "none") {
							const existingRank = RANKS.find(
								(r) => r !== rank && preferredMenus[r] === menu,
							);
							if (existingRank) {
								toast.warning(
									"이미 선택되었어요. 다른 메뉴를 골라주세요!",
								);
								return;
							}
						}

						let newMenus = {
							...preferredMenus,
							[rank]: menu,
						};

						if (menu === "none") {
							const rankIndex = RANKS.indexOf(rank);
							const ranksToRemove = RANKS.slice(rankIndex + 1);
							newMenus = Object.fromEntries(
								Object.entries(newMenus).filter(
									([key]) =>
										!ranksToRemove.includes(key as RankKey),
								),
							) as OpinionForm["preferredMenus"];
						}

						field.onChange(newMenus);
					};

					return (
						<>
							{RANKS.map((rank) => (
								<RankSection
									key={rank}
									rank={rank}
									selectedMenu={preferredMenus[rank]}
									isNoneSelected={isNoneSelected(
										rank,
										preferredMenus,
									)}
									isDisabled={isDisabled(rank, preferredMenus)}
									onMenuSelect={(menu) =>
										handleMenuSelect(rank, menu)
									}
								/>
							))}
						</>
					);
				}}
			/>
		</div>
	);
};

export const PreferenceStepFooter = ({
	onComplete,
}: Pick<PreferenceStepProps, "onComplete">) => {
	const { control } = useFormContext<OpinionForm>();

	const isNoneSelected = useCallback(
		(rank: RankKey, preferredMenus: OpinionForm["preferredMenus"]) => {
			return preferredMenus[rank] === "none";
		},
		[],
	);

	const isCompleteEnabled = useCallback(
		(preferredMenus: OpinionForm["preferredMenus"]): boolean => {
			const noneSelectedIndex = RANKS.findIndex((rank) =>
				isNoneSelected(rank, preferredMenus),
			);

			if (noneSelectedIndex === -1) {
				return true;
			}

			return RANKS.slice(0, noneSelectedIndex).every((rank) => {
				const value = preferredMenus[rank];
				return value && value !== "none";
			});
		},
		[isNoneSelected],
	);

	return (
		<Layout.Footer>
			<div className="ygi:px-6">
				<Controller
					name="preferredMenus"
					control={control}
					render={({ field }) => (
						<Button
							variant="primary"
							width="full"
							disabled={!isCompleteEnabled(field.value || {})}
							onClick={onComplete}
						>
							완료
						</Button>
					)}
				/>
			</div>
		</Layout.Footer>
	);
};
