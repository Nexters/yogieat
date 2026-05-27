"use client";

import { useFormContext, useWatch } from "react-hook-form";

import { Button } from "#/components/button/Button";
import { DotsLoader } from "#/components/dotsLoader";
import { Layout } from "#/components/layout";
import { StepHeader } from "#/components/stepHeader";
import { DislikeStep } from "#/pageComponents/gathering/opinion/form/DislikeStep";
import {
	type AloneFormSchema,
	dislikedCategoriesSchema,
} from "#/schemas/gathering";

export const AloneDislikeStepContent = () => {
	return (
		<div className="ygi:pt-3">
			<div className="ygi:flex ygi:flex-col ygi:gap-xl ygi:px-6">
				<StepHeader.Root>
					<StepHeader.Title>
						안 먹고 싶은 음식을 골라주세요
					</StepHeader.Title>
					<StepHeader.Description>
						2개까지 선택할 수 있어요
					</StepHeader.Description>
				</StepHeader.Root>
			</div>
			<DislikeStep.Content />
		</div>
	);
};

interface AloneDislikeStepFooterProps {
	isPending: boolean;
}

export const AloneDislikeStepFooter = ({
	isPending,
}: AloneDislikeStepFooterProps) => {
	const { control } = useFormContext<AloneFormSchema>();

	const disabled = useWatch({
		control,
		name: "dislikedCategories",
		compute: (dislikedCategories) =>
			!dislikedCategoriesSchema.safeParse(dislikedCategories).success,
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
