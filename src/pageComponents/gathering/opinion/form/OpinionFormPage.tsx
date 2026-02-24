"use client";

import { useParams, useRouter } from "next/navigation";
import { FormProvider } from "react-hook-form";

import { BackwardButton } from "#/components/backwardButton";
import { Layout } from "#/components/layout";
import { StepTransition } from "#/components/stepTransition";
import { Toaster } from "#/components/toast";
import { useGetGathering } from "#/hooks/apis/gathering";
import { useOpinionForm, useOpinionFunnel } from "#/hooks/gathering";

import { DistanceStep } from "./DistanceStep";
import { DislikeStep } from "./DislikeStep";
import { NicknameStep } from "./NicknameStep";
import { PreferenceStep } from "./PreferenceStep";

export function OpinionFormPage() {
	const { accessKey } = useParams<{ accessKey: string }>();
	const router = useRouter();

	const { methods, onSubmit } = useOpinionForm();
	const { step, direction, next, back, isFirstStep } = useOpinionFunnel();

	const { data: gathering } = useGetGathering(accessKey);

	const handleBackward = () => {
		if (isFirstStep) {
			router.back();
		} else {
			back();
		}
	};

	const renderHeader = () => {
		if (step === "nickname") return null;
		return <BackwardButton onClick={handleBackward} />;
	};

	const renderContent = () => {
		switch (step) {
			case "nickname":
				return (
					<div className="ygi:flex ygi:flex-col ygi:gap-xl ygi:px-6 ygi:pt-3">
						<NicknameStep.Header />
						<NicknameStep.Content />
					</div>
				);
			case "distance":
				return (
					<div className="ygi:flex ygi:flex-col ygi:gap-xl ygi:px-6 ygi:pt-3">
						<DistanceStep.Header region={gathering.region} />
						<DistanceStep.Content />
					</div>
				);
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
			case "nickname":
				return <NicknameStep.Footer onNext={next} />;
			case "distance":
				return <DistanceStep.Footer onNext={next} />;
			case "dislike":
				return <DislikeStep.Footer onNext={next} />;
			case "preference":
				return <PreferenceStep.Footer />;
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
