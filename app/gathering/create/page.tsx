"use client";

import { useRouter } from "next/navigation";
import { FormProvider } from "react-hook-form";

import { Layout } from "#/components/layout";
import { BackwardButton } from "#/components/backwardButton";
import { StepTransition } from "#/components/stepTransition";
import {
	PeopleStepContent,
	PeopleStepFooter,
	DateStepContent,
	DateStepFooter,
	RegionStepContent,
	RegionStepFooter,
} from "#/pageComponents/gathering/create";
import {
	useCreateMeetingForm,
	useCreateMeetingFunnel,
} from "#/hooks/gathering";
import { Toaster } from "#/components/toast";

export default function GatheringCreatePage() {
	const router = useRouter();
	const form = useCreateMeetingForm();
	const { step, direction, next, back, isFirstStep } =
		useCreateMeetingFunnel();

	const handleBackward = () => {
		if (isFirstStep) {
			router.push("/");
		} else {
			back();
		}
	};

	const handleComplete = (accessKey: string) => {
		router.push(`/gathering/create/complete/${accessKey}`);
	};

	const renderContent = () => {
		switch (step) {
			case "people":
				return <PeopleStepContent />;
			case "date":
				return <DateStepContent />;
			case "region":
				return <RegionStepContent />;
			default:
				return null;
		}
	};

	const renderFooter = () => {
		switch (step) {
			case "people":
				return <PeopleStepFooter onNext={next} />;
			case "date":
				return <DateStepFooter onNext={next} />;
			case "region":
				return <RegionStepFooter onComplete={handleComplete} />;
			default:
				return null;
		}
	};

	return (
		<FormProvider {...form}>
			<Layout.Root>
				<Layout.Header>
					{step !== "people" && (
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
			</Layout.Root>
		</FormProvider>
	);
}
