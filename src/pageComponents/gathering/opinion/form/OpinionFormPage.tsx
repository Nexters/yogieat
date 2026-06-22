"use client";

import { useRouter } from "next/navigation";
import { FormProvider } from "react-hook-form";

import { BackwardButton } from "#/components/backwardButton";
import { Layout } from "#/components/layout";
import { StepTransition } from "#/components/stepTransition";
import { Toaster } from "#/components/toast";
import { useOpinionForm, useOpinionFunnel } from "#/hooks/gathering";

import { DislikeStep } from "./DislikeStep";
import { PreferenceStep } from "./PreferenceStep";

export function OpinionFormPage() {
	const router = useRouter();

	const { methods, onSubmit, isPending } = useOpinionForm();
	const { step, direction, next, back, isFirstStep } = useOpinionFunnel();

	const handleBackward = () => {
		if (isFirstStep) {
			router.back();
		} else {
			back();
		}
	};

	const renderHeader = () => {
		return <BackwardButton onClick={handleBackward} />;
	};

	const renderContent = () => {
		switch (step) {
			case "dislike":
				return (
					<div className="ygi:pt-3">
						<div className="ygi:flex ygi:flex-col ygi:gap-xl ygi:px-6">
							<DislikeStep.Header />
						</div>
						<DislikeStep.Content />
					</div>
				);
			case "preference":
				return (
					<div className="ygi:flex ygi:flex-col ygi:gap-8 ygi:px-6 ygi:pt-3 ygi:pb-6">
						<div className="ygi:flex ygi:flex-col ygi:gap-6">
							<PreferenceStep.Header />
						</div>
						<PreferenceStep.Content />
					</div>
				);
			default:
				return null;
		}
	};

	const renderFooter = () => {
		switch (step) {
			case "dislike":
				return <DislikeStep.Footer onNext={next} />;
			case "preference":
				return <PreferenceStep.Footer isPending={isPending} />;
			default:
				return null;
		}
	};

	return (
		<FormProvider {...methods}>
			<form onSubmit={onSubmit}>
				<Layout.Header>{renderHeader()}</Layout.Header>
				<Layout.Content>
					<StepTransition step={step} direction={direction}>
						{renderContent()}
					</StepTransition>
				</Layout.Content>
				{renderFooter()}
				<Toaster
					offset={{ bottom: 96 }}
					mobileOffset={{ bottom: 96 }}
				/>
			</form>
		</FormProvider>
	);
}
