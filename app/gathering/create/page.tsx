"use client";

import { useRouter } from "next/navigation";
import { FormProvider } from "react-hook-form";

import { Layout } from "#/components/layout";
import { BackwardButton } from "#/components/backwardButton/BackwardButton";
import {
	PeopleStep,
	DateStep,
	LocationStep,
} from "#/pageComponents/gathering/create";
import {
	useCreateMeetingForm,
	useCreateMeetingFunnel,
} from "#/hooks/gathering";

export default function GatheringCreatePage() {
	const router = useRouter();
	const form = useCreateMeetingForm();
	const { step, next, back, isFirstStep } = useCreateMeetingFunnel();

	const handleBackward = () => {
		if (isFirstStep) {
			router.push("/");
		} else {
			back();
		}
	};

	return (
		<FormProvider {...form}>
			<Layout.Root>
				<Layout.Header>
					<BackwardButton onClick={handleBackward} />
				</Layout.Header>

				<Layout.Content>
					{step === "people" && <PeopleStep onNext={next} />}
					{step === "date" && <DateStep onNext={next} />}
					{step === "location" && (
						<LocationStep
							onComplete={() => {
								router.push("/gathering/create/complete");
							}}
						/>
					)}
				</Layout.Content>
			</Layout.Root>
		</FormProvider>
	);
}
