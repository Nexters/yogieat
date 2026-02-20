"use client";

import { useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { omit } from "es-toolkit";

import { trackStepComplete } from "#/components/analytics";
import { Layout } from "#/components/layout";
import { StepIndicator } from "#/components/stepIndicator";
import { StepHeader } from "#/components/stepHeader";
import { Button } from "#/components/button";
import {
	RANKS,
	OPINION_TOTAL_STEPS,
	FOOD_CATEGORIES,
} from "#/constants/gathering/opinion";
import { RankSection } from "./RankSection";
import {
	preferredMenusSchema,
	type OpinionFormSchema,
} from "#/schemas/gathering";
import type { RankKey } from "#/types/gathering";

export const PreferenceStepContent = () => {
	const { control, setValue } = useFormContext<OpinionFormSchema>();

	const [dislikedFoods, preferredMenus] = useWatch({
		control,
		name: ["dislikedFoods", "preferredMenus"],
	});

	useEffect(() => {
		if (!dislikedFoods || !preferredMenus) return;

		const ranksToRemove: RankKey[] = [];

		RANKS.forEach((rank) => {
			const selectedCategory = preferredMenus[rank];
			if (
				selectedCategory &&
				selectedCategory !== "ANY" &&
				dislikedFoods.includes(selectedCategory)
			) {
				ranksToRemove.push(rank);
			}
		});

		if (ranksToRemove.length > 0) {
			const cleanedMenus = omit(preferredMenus, ranksToRemove);
			setValue("preferredMenus", cleanedMenus);
		}
	}, [dislikedFoods, preferredMenus, setValue]);

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

			<div className="ygi:flex ygi:flex-col ">
				{RANKS.map((rank) => (
					<RankSection key={rank} rank={rank} />
				))}
			</div>
		</div>
	);
};

export const PreferenceStepFooter = () => {
	const { control } = useFormContext<OpinionFormSchema>();

	const { preferredMenus, disabled } = useWatch({
		control,
		name: "preferredMenus",
		compute: (preferredMenus) => ({
			preferredMenus,
			disabled: !preferredMenusSchema.safeParse(preferredMenus).success,
		}),
	});

	const handleClick = () => {
		const preferredLabels = RANKS.map((rank) => {
			const value = preferredMenus?.[rank];
			if (!value) return null;
			if (value === "ANY") return "상관없음";
			return FOOD_CATEGORIES.find((c) => c.value === value)?.label;
		})
			.filter(Boolean)
			.join(", ");
		trackStepComplete({
			page_id: "의견수합_퍼널",
			step_name: "선호음식",
			step_value: preferredLabels,
		});
	};

	return (
		<Layout.Footer>
			<div className="ygi:px-6">
				<Button
					type="submit"
					variant="primary"
					width="full"
					disabled={disabled}
					onClick={handleClick}
				>
					완료
				</Button>
			</div>
		</Layout.Footer>
	);
};
