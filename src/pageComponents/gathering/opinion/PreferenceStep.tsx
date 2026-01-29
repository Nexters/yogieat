"use client";

import { useFormContext } from "react-hook-form";

import { Layout } from "#/components/layout";
import { StepIndicator } from "#/components/stepIndicator";
import { StepHeader } from "#/components/stepHeader";
import { Button } from "#/components/button";
import { RANKS, OPINION_TOTAL_STEPS } from "#/constants/gathering/opinion";
import { usePreferenceStep } from "#/hooks/gathering";
import { RankSection } from "./RankSection";
import type { OpinionFormSchema } from "#/schemas/gathering";

export const PreferenceStepContent = () => {
	const { control } = useFormContext<OpinionFormSchema>();
	const { preferredMenus, handleMenuSelect, isRankDisabled } =
		usePreferenceStep(control);

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
					<RankSection
						key={rank}
						rank={rank}
						selectedMenu={preferredMenus[rank]}
						isDisabled={isRankDisabled(rank)}
						onMenuSelect={(menu) => handleMenuSelect(rank, menu)}
					/>
				))}
			</div>
		</div>
	);
};

interface PreferenceStepFooterProps {
	onSubmit: () => void;
}

export const PreferenceStepFooter = ({
	onSubmit,
}: PreferenceStepFooterProps) => {
	const { control } = useFormContext<OpinionFormSchema>();
	const { isValid } = usePreferenceStep(control);

	return (
		<Layout.Footer>
			<div className="ygi:px-6">
				<Button
					variant="primary"
					width="full"
					disabled={!isValid}
					onClick={onSubmit}
				>
					완료
				</Button>
			</div>
		</Layout.Footer>
	);
};
