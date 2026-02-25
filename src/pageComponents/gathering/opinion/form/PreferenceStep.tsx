"use client";

import { useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { omit } from "es-toolkit";

import { trackStepComplete } from "#/components/analytics";
import { Button } from "#/components/button";
import { Layout } from "#/components/layout";
import { StepHeader } from "#/components/stepHeader";
import { StepIndicator } from "#/components/stepIndicator";
import {
	CATEGORY_LIST,
	OPINION_TOTAL_STEPS,
	RANK_LABEL,
	RANK_LIST,
} from "#/constants/gathering/opinion";
import {
	preferredCategoriesSchema,
	type OpinionFormSchema,
} from "#/schemas/gathering";
import type { RankKey } from "#/types/gathering";

import { RankChip } from "./RankChip";

interface RankSectionProps {
	rank: RankKey;
}

const RankSection = ({ rank }: RankSectionProps) => {
	const { control } = useFormContext<OpinionFormSchema>();

	const disabled = useWatch({
		control,
		name: "preferredCategories",
		compute: (data) =>
			RANK_LIST.slice(0, RANK_LIST.indexOf(rank)).some(
				(prevRank) => data[prevRank] === "ANY",
			),
	});

	const dislikedCategories = useWatch({
		control,
		name: "dislikedCategories",
	});

	const availableCategories = CATEGORY_LIST.filter(
		(category) =>
			category.value === "ANY" ||
			!dislikedCategories?.includes(category.value),
	);

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

const Header = () => {
	return (
		<>
			<StepIndicator currentStep={3} totalSteps={OPINION_TOTAL_STEPS} />
			<StepHeader.Root>
				<StepHeader.Title>먹고 싶은 음식을 골라주세요</StepHeader.Title>
			</StepHeader.Root>
		</>
	);
};

const Content = () => {
	const { control, setValue } = useFormContext<OpinionFormSchema>();

	const [dislikedCategories, preferredCategories] = useWatch({
		control,
		name: ["dislikedCategories", "preferredCategories"],
	});

	useEffect(() => {
		if (!dislikedCategories || !preferredCategories) return;

		const ranksToRemove: RankKey[] = [];

		RANK_LIST.forEach((rank) => {
			const selectedCategory = preferredCategories[rank];
			if (
				selectedCategory &&
				selectedCategory !== "ANY" &&
				dislikedCategories.includes(selectedCategory)
			) {
				ranksToRemove.push(rank);
			}
		});

		if (ranksToRemove.length > 0) {
			const cleanedMenus = omit(preferredCategories, ranksToRemove);
			setValue("preferredCategories", cleanedMenus);
		}
	}, [dislikedCategories, preferredCategories, setValue]);

	return (
		<div className="ygi:flex ygi:flex-col">
			{RANK_LIST.map((rank) => (
				<RankSection key={rank} rank={rank} />
			))}
		</div>
	);
};

const Footer = () => {
	const { control } = useFormContext<OpinionFormSchema>();

	const { preferredCategories, disabled } = useWatch({
		control,
		name: "preferredCategories",
		compute: (preferredCategories) => ({
			preferredCategories,
			disabled:
				!preferredCategoriesSchema.safeParse(preferredCategories)
					.success,
		}),
	});

	const handleClick = () => {
		const preferredLabels = RANK_LIST.map((rank) => {
			const value = preferredCategories?.[rank];
			if (!value) return null;
			if (value === "ANY") return "상관없음";
			return CATEGORY_LIST.find((c) => c.value === value)?.label;
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

export const PreferenceStep = {
	Header,
	Content,
	Footer,
};
