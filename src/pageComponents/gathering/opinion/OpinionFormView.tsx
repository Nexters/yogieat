"use client";

import { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { FormProvider } from "react-hook-form";

import {
	DistanceStepContent,
	DistanceStepFooter,
	DislikeStepContent,
	DislikeStepFooter,
	PreferenceStepContent,
	PreferenceStepFooter,
	NicknameStepContent,
	NicknameStepFooter,
} from "#/pageComponents/gathering/opinion";
import { StepTransition } from "#/components/stepTransition";
import { useOpinionForm, useOpinionFunnel } from "#/hooks/gathering";
import { Layout } from "#/components/layout";
import { BackwardButton } from "#/components/backwardButton";
import { Toaster } from "#/components/toast";
import { useGetGathering } from "#/hooks/apis/gathering";
import { useServerSentEvent } from "#/hooks/sse";

export function OpinionFormView() {
	const { accessKey } = useParams<{ accessKey: string }>();
	const router = useRouter();

	const { methods, onSubmit } = useOpinionForm();
	const { step, direction, next, back, isFirstStep } = useOpinionFunnel();

	const { data: gathering } = useGetGathering(accessKey);

	const eventHandlers = useMemo(
		() => ({
			"gathering-full": () => {
				router.push(`/gathering/${accessKey}/opinion/result`);
			},
		}),
		[accessKey, router],
	);

	useServerSentEvent({
		url: `/gatherings/${accessKey}/subscribe`,
		events: eventHandlers,
	});

	const handleBackward = () => {
		if (isFirstStep) {
			router.back();
		} else {
			back();
		}
	};

	const renderContent = () => {
		switch (step) {
			case "nickname":
				return <NicknameStepContent />;
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
			case "nickname":
				return <NicknameStepFooter onNext={next} />;
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
					{step !== "nickname" && (
						<BackwardButton onClick={handleBackward} />
					)}
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
