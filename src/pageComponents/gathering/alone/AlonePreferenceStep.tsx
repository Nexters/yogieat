"use client";

import { useFormContext, useWatch } from "react-hook-form";

import { Button } from "#/components/button";
import { DotsLoader } from "#/components/dotsLoader";
import { Layout } from "#/components/layout";
import { StepHeader } from "#/components/stepHeader";
import { PreferenceStep } from "#/pageComponents/gathering/opinion/form/PreferenceStep";
import {
	type AloneFormSchema,
	preferredCategoriesSchema,
} from "#/schemas/gathering";

export const AlonePreferenceStepContent = () => {
	return (
		<div className="ygi:flex ygi:flex-col ygi:gap-8 ygi:px-6 ygi:pt-3 ygi:pb-6">
			<StepHeader.Root>
				<StepHeader.Title>먹고 싶은 음식을 골라주세요</StepHeader.Title>
			</StepHeader.Root>
			<PreferenceStep.Content />
		</div>
	);
};

interface AlonePreferenceStepFooterProps {
	isPending: boolean;
}

export const AlonePreferenceStepFooter = ({
	isPending,
}: AlonePreferenceStepFooterProps) => {
	const { control } = useFormContext<AloneFormSchema>();

	const disabled = useWatch({
		control,
		name: "preferredCategories",
		compute: (preferredCategories) =>
			!preferredCategoriesSchema.safeParse(preferredCategories).success,
	});

	return (
		<Layout.Footer>
			<div className="ygi:px-6">
				<Button
					type="submit"
					variant="primary"
					width="full"
					disabled={disabled || isPending}
				>
					{isPending ? <DotsLoader /> : "완료"}
				</Button>
			</div>
		</Layout.Footer>
	);
};
