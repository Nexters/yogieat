"use client";

import { useParams, useRouter } from "next/navigation";
import { useMemo } from "react";

import {
	IntroStep,
	DistanceStepContent,
	DistanceStepFooter,
	DislikeStepContent,
	DislikeStepFooter,
	StepTransition,
} from "#/pageComponents/gathering/opinion";
import { useOpinionForm, useOpinionFunnel } from "#/hooks/gathering";
import { Button } from "#/components/button";
import { Layout } from "#/components/layout";
import { MOCK_MEETING_DATA } from "#/constants/gathering/opinion/meeting";
import { MeetingContext } from "#/types/gathering";
import { FormProvider } from "react-hook-form";
import { BackwardButton } from "#/components/backwardButton";

export default function OpinionPage() {
	const params = useParams();
	const router = useRouter();
	const gatheringId = params.gatheringId as string;

	const form = useOpinionForm();
	const { step, direction, next, back, isFirstStep } = useOpinionFunnel();

	// Meeting context
	const meetingContext = useMemo<MeetingContext>(
		() => ({
			gatheringId,
			meetingDate: MOCK_MEETING_DATA.DATE,
			stationName: MOCK_MEETING_DATA.STATION_NAME,
		}),
		[gatheringId],
	);

	const handleBackward = () => {
		if (isFirstStep) {
			router.push(`/gathering/${gatheringId}`);
		} else {
			back();
		}
	};

	// Intro step - special layout
	if (step === "intro") {
		return (
			<Layout.Root>
				<Layout.Header background="gray">
					<div className="ygi:h-full ygi:w-full" />
				</Layout.Header>
				<Layout.Content background="gray">
					<IntroStep
						step="intro"
						meetingContext={meetingContext}
						onNext={next}
					/>
				</Layout.Content>
				<Layout.Footer background="gray">
					<div className="ygi:py-auto ygi:px-6">
						<Button variant="primary" width="full" onClick={next}>
							내 취향 입력
						</Button>
					</div>
				</Layout.Footer>
			</Layout.Root>
		);
	}

	// Survey steps - with FormProvider
	const renderContent = () => {
		switch (step) {
			case "distance":
				return <DistanceStepContent meetingContext={meetingContext} />;
			case "dislike":
				return <DislikeStepContent />;
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
			default:
				return null;
		}
	};

	return (
		<FormProvider {...form}>
			<Layout.Root>
				<Layout.Header>
					<BackwardButton onClick={handleBackward} />
				</Layout.Header>
				<Layout.Content>
					<StepTransition step={step} direction={direction}>
						{renderContent()}
					</StepTransition>
				</Layout.Content>
				{renderFooter()}
			</Layout.Root>
		</FormProvider>
	);
}
