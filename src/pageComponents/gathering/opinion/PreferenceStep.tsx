"use client";

import { useFormContext, useWatch } from "react-hook-form";

import { Layout } from "#/components/layout";
import { StepIndicator } from "#/components/stepIndicator";
import { StepHeader } from "#/components/stepHeader";
import { Button } from "#/components/button";
import { RANKS, OPINION_TOTAL_STEPS } from "#/constants/gathering/opinion";
import { RankSection } from "./RankSection";
import type { OpinionFormSchema } from "#/schemas/gathering";

export const PreferenceStepContent = () => {
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
	const disabled = useWatch({
		control,
		name: "preferredMenus",
		compute: (value) => {
			const { first, second, third } = value || {};

			if (!first) return true;

			if (first === "ANY") return !!second || !!third;

			if (!second) return true;

			if (second === "ANY") return !!third;

			return !third;
		},
	});

	return (
		<Layout.Footer>
			<div className="ygi:px-6">
				<Button
					type="submit"
					variant="primary"
					width="full"
					disabled={disabled}
				>
					완료
				</Button>
			</div>
		</Layout.Footer>
	);
};
