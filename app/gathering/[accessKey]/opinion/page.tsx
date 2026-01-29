"use client";

import { useParams, useRouter } from "next/navigation";

import {
	IntroStep,
	DistanceStepContent,
	DistanceStepFooter,
	DislikeStepContent,
	DislikeStepFooter,
	StepTransition,
	PreferenceStepContent,
	PreferenceStepFooter,
} from "#/pageComponents/gathering/opinion";
import { useOpinionForm, useOpinionFunnel } from "#/hooks/gathering";
import { Button } from "#/components/button";
import { Layout } from "#/components/layout";
import { FormProvider } from "react-hook-form";
import { BackwardButton } from "#/components/backwardButton";
import { Toaster } from "#/components/toast";
import { useMemo } from "react";
import { MeetingContext } from "#/types/gathering";
import { MOCK_MEETING_DATA } from "#/constants/gathering/opinion/meeting";

export default function OpinionPage() {
	const { accessKey } = useParams<{ accessKey: string }>();
	const router = useRouter();

	const form = useOpinionForm();
	const { step, direction, next, back, isFirstStep } = useOpinionFunnel();

	const meetingContext = useMemo<MeetingContext>(
		() => ({
			accessKey,
			scheduledDate: MOCK_MEETING_DATA.DATE,
			stationName: MOCK_MEETING_DATA.STATION_NAME,
		}),
		[accessKey],
	);

	const handleBackward = () => {
		if (isFirstStep) {
			router.push(`/gathering/${accessKey}`);
		} else {
			back();
		}
	};

	const handleComplete = () => {
		router.replace(`/gathering/${accessKey}/opinion/pending`);
	};

	if (step === "intro") {
		return (
			<>
				<Layout.Header background="gray">
					<div className="ygi:h-full ygi:w-full" />
				</Layout.Header>
				<Layout.Content background="gray">
					{/* TODO : API 연동 과정에서 대체가 필요한 코드 */}
					<IntroStep
						meetingContext={meetingContext}
						step="intro"
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
			</>
		);
	}

	const renderContent = () => {
		switch (step) {
			case "distance":
				return <DistanceStepContent meetingContext={meetingContext} />;
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
				return <PreferenceStepFooter onComplete={handleComplete} />;
			default:
				return null;
		}
	};

	return (
		<FormProvider {...form}>
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
