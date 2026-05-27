"use client";

import { useRouter } from "next/navigation";
import { FormProvider } from "react-hook-form";

import { BackwardButton } from "#/components/backwardButton";
import { Layout } from "#/components/layout";
import { StepTransition } from "#/components/stepTransition";
import { Toaster } from "#/components/toast";
import { useAloneForm, useAloneFunnel } from "#/hooks/gathering";

import {
	AloneDateStepContent,
	AloneDateStepFooter,
} from "./AloneDateStep";
import {
	AloneDislikeStepContent,
	AloneDislikeStepFooter,
} from "./AloneDislikeStep";
import {
	AlonePreferenceStepContent,
	AlonePreferenceStepFooter,
} from "./AlonePreferenceStep";
import {
	AloneRegionStepContent,
	AloneRegionStepFooter,
} from "./AloneRegionStep";

export function AloneFormPage() {
	const router = useRouter();
	const { methods, onSubmit, isPending } = useAloneForm();
	const { step, direction, next, back, isFirstStep } = useAloneFunnel();

	const handleBackward = () => {
		if (isFirstStep) {
			router.back();
		} else {
			back();
		}
	};

	const renderContent = () => {
		switch (step) {
			case "date":
				return <AloneDateStepContent />;
			case "region":
				return <AloneRegionStepContent />;
			case "preference":
				return <AlonePreferenceStepContent />;
			case "dislike":
				return <AloneDislikeStepContent />;
			default:
				return null;
		}
	};

	const renderFooter = () => {
		switch (step) {
			case "date":
				return <AloneDateStepFooter onNext={next} />;
			case "region":
				return <AloneRegionStepFooter onNext={next} />;
			case "preference":
				return <AlonePreferenceStepFooter onNext={next} />;
			case "dislike":
				return <AloneDislikeStepFooter isPending={isPending} />;
			default:
				return null;
		}
	};

	return (
		<FormProvider {...methods}>
			<Layout.Root>
				<form onSubmit={onSubmit}>
					<Layout.Header>
						<BackwardButton onClick={handleBackward} />
					</Layout.Header>

					<Layout.Content>
						<StepTransition step={step} direction={direction}>
							{renderContent()}
						</StepTransition>
					</Layout.Content>

					{renderFooter()}
				</form>

				<Toaster
					offset={{ bottom: 96 }}
					mobileOffset={{ bottom: 96 }}
				/>
			</Layout.Root>
		</FormProvider>
	);
}
