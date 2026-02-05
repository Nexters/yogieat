"use client";

import { redirect, useParams, useRouter } from "next/navigation";
import { FormProvider } from "react-hook-form";

import {
	DistanceStepContent,
	DistanceStepFooter,
	DislikeStepContent,
	DislikeStepFooter,
	PreferenceStepContent,
	PreferenceStepFooter,
} from "#/pageComponents/gathering/opinion";
import { StepTransition } from "#/components/stepTransition";
import { useOpinionForm, useOpinionFunnel } from "#/hooks/gathering";
import { Layout } from "#/components/layout";
import { BackwardButton } from "#/components/backwardButton";
import { Toaster } from "#/components/toast";
import {
	useGetGathering,
	useGetGatheringCapacity,
} from "#/hooks/apis/gathering";

export function OpinionFormView() {
	const { accessKey } = useParams<{ accessKey: string }>();
	const router = useRouter();

	const { methods, onSubmit } = useOpinionForm();
	const { step, direction, next, back, isFirstStep } = useOpinionFunnel({
		skipIntro: true,
	});

	const { data: capacity } = useGetGatheringCapacity(accessKey);
	const { data: gathering } = useGetGathering(accessKey);

	const isComplete = capacity.currentCount >= capacity.maxCount;

	if (isComplete) {
		redirect(`/gathering/${accessKey}/opinion/complete`);
	}

	const handleBackward = () => {
		if (isFirstStep) {
			router.back();
		} else {
			back();
		}
	};

	const renderContent = () => {
		switch (step) {
			case "distance":
				return <DistanceStepContent region={gathering.region} />;
			case "dislike":
				return <DislikeStepContent />;
			case "preference":
				return <PreferenceStepContent />;
			default:
				return null;
		}
	};

	const renderFooter = () => {
		switch (step) {
			case "distance":
				return <DistanceStepFooter onNext={next} />;
			case "dislike":
				return <DislikeStepFooter onNext={next} />;
			case "preference":
				return <PreferenceStepFooter />;
			default:
				return null;
		}
	};

	return (
		<FormProvider {...methods}>
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
				<Toaster
					offset={{ bottom: 96 }}
					mobileOffset={{ bottom: 96 }}
				/>
			</form>
		</FormProvider>
	);
}
