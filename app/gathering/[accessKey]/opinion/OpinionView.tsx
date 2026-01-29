"use client";

import { useParams, useRouter } from "next/navigation";

import {
	IntroStep,
	DistanceStepContent,
	DistanceStepFooter,
	DislikeStepContent,
	DislikeStepFooter,
	PreferenceStepContent,
	PreferenceStepFooter,
} from "#/pageComponents/gathering/opinion";
import { StepTransition } from "#/components/stepTransition";
import { useOpinionForm, useOpinionFunnel } from "#/hooks/gathering";
import { Button } from "#/components/button";
import { Layout } from "#/components/layout";
import { FormProvider } from "react-hook-form";
import { BackwardButton } from "#/components/backwardButton";
import { Toaster } from "#/components/toast";
import { useGetGathering } from "#/hooks/apis/gathering";

export default function OpinionView() {
	const { accessKey } = useParams<{ accessKey: string }>();
	const router = useRouter();

	const { methods, onSubmit } = useOpinionForm();
	const { step, direction, next, back, isFirstStep } = useOpinionFunnel();
	const { data: gathering } = useGetGathering(accessKey);

	const handleBackward = () => {
		if (isFirstStep) {
			router.push(`/gathering/${accessKey}`);
		} else {
			back();
		}
	};

	const handleComplete = () => {
		onSubmit();
	};

	if (step === "intro") {
		return (
			<>
				<Layout.Header background="gray">
					<div className="ygi:h-full ygi:w-full" />
				</Layout.Header>
				<Layout.Content background="gray">
					<IntroStep scheduledDate={gathering.data.scheduledDate} />
				</Layout.Content>
				<Layout.Footer background="gray">
					<div className="ygi:py-auto ygi:px-6">
						<Button variant="primary" width="full" onClick={next}>
							내 취향 입력
						</Button>
					</div>
				</Layout.Footer>
			</>
		);
	}

	const renderContent = () => {
		switch (step) {
			case "distance":
				return <DistanceStepContent region={gathering.data.region} />;
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
				return <PreferenceStepFooter onSubmit={handleComplete} />;
			default:
				return null;
		}
	};

	return (
		<FormProvider {...methods}>
			<Layout.Header>
				<BackwardButton onClick={handleBackward} />
			</Layout.Header>
			<Layout.Content>
				<StepTransition step={step} direction={direction}>
					{renderContent()}
				</StepTransition>
			</Layout.Content>
			{renderFooter()}
			<Toaster offset={{ bottom: 96 }} mobileOffset={{ bottom: 96 }} />
		</FormProvider>
	);
}
