"use client";

import { useCallback } from "react";
import { useFormContext, Controller } from "react-hook-form";

import { Layout } from "#/components/layout";
import { StepIndicator } from "#/components/stepIndicator";
import { StepHeader } from "#/components/stepHeader";
import { Button } from "#/components/button";
import { RANKS, OPINION_TOTAL_STEPS } from "#/constants/gathering/opinion";
import { toast } from "#/utils/toast";
import { RankSection } from "./RankSection";
import type {
	OpinionForm,
	FoodCategory,
	RankKey,
	PreferenceStepProps,
} from "#/types/gathering";

const isNoneSelected = (
	rank: RankKey,
	preferredMenus: OpinionForm["preferredMenus"],
) => {
	return preferredMenus[rank] === "ANY";
};

const isDisabled = (
	rank: RankKey,
	preferredMenus: OpinionForm["preferredMenus"],
) => {
	const rankIndex = RANKS.indexOf(rank);
	return RANKS.slice(0, rankIndex).some((prevRank) =>
		isNoneSelected(prevRank, preferredMenus),
	);
};

export const PreferenceStepContent = () => {
	const { control } = useFormContext<OpinionForm>();

	const handleMenuSelect = useCallback(
		(
			rank: RankKey,
			menu: FoodCategory,
			preferredMenus: OpinionForm["preferredMenus"],
			onChange: (value: OpinionForm["preferredMenus"]) => void,
		) => {
			if (preferredMenus[rank] === menu) {
				const newMenus = { ...preferredMenus };
				delete newMenus[rank];
				onChange(newMenus);
				return;
			}

			if (menu !== "ANY") {
				const existingRank = RANKS.find(
					(r) => r !== rank && preferredMenus[r] === menu,
				);

				if (existingRank) {
					console.log("trigger");
					toast.warning("이미 선택되었어요. 다른 메뉴를 골라주세요!");
					return;
				}
			}

			let newMenus = {
				...preferredMenus,
				[rank]: menu,
			};

			if (menu === "ANY") {
				const rankIndex = RANKS.indexOf(rank);
				const ranksToRemove = RANKS.slice(rankIndex + 1);
				newMenus = Object.fromEntries(
					Object.entries(newMenus).filter(
						([key]) => !ranksToRemove.includes(key as RankKey),
					),
				) as OpinionForm["preferredMenus"];
			}

			onChange(newMenus);
		},
		[],
	);

	return (
		<div className="ygi:flex ygi:flex-col ygi:gap-8 ygi:px-6 ygi:pt-3 ygi:pb-6">
			<div className="ygi:flex ygi:flex-col ygi:gap-6">
				<StepIndicator
					currentStep={3}
					totalSteps={OPINION_TOTAL_STEPS}
				/>
				<StepHeader.Root>
					<StepHeader.Title>
						먹고 싶은 음식을 골라주세요
					</StepHeader.Title>
				</StepHeader.Root>
			</div>

			<Controller
				name="preferredMenus"
				control={control}
				render={({ field }) => {
					const preferredMenus = field.value || {};
					return (
						<div className="ygi:flex ygi:flex-col ">
							{RANKS.map((rank) => (
								<RankSection
									key={rank}
									rank={rank}
									selectedMenu={preferredMenus[rank]}
									isDisabled={isDisabled(
										rank,
										preferredMenus,
									)}
									onMenuSelect={(menu) =>
										handleMenuSelect(
											rank,
											menu,
											preferredMenus,
											field.onChange,
										)
									}
								/>
							))}
						</div>
					);
				}}
			/>
		</div>
	);
};

const isCompleteEnabled = (
	preferredMenus: OpinionForm["preferredMenus"],
): boolean => {
	const noneSelectedIndex = RANKS.findIndex((rank) =>
		isNoneSelected(rank, preferredMenus),
	);

	if (noneSelectedIndex === -1) {
		return RANKS.every((rank) => {
			const value = preferredMenus[rank];
			return value && value !== "ANY";
		});
	}

	return RANKS.slice(0, noneSelectedIndex).every((rank) => {
		const value = preferredMenus[rank];
		return value && value !== "ANY";
	});
};

export const PreferenceStepFooter = ({
	onComplete,
}: Pick<PreferenceStepProps, "onComplete">) => {
	const { control } = useFormContext<OpinionForm>();

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
