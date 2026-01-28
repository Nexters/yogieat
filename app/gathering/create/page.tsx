"use client";

import { useRouter } from "next/navigation";
import { FormProvider } from "react-hook-form";

import { Layout } from "#/components/layout";
import { BackwardButton } from "#/components/backwardButton";
import {
	PeopleStep,
	DateStep,
	RegionStep,
} from "#/pageComponents/gathering/create";
import {
	useCreateMeetingForm,
	useCreateMeetingFunnel,
} from "#/hooks/gathering";
import { Toaster } from "#/components/toast";

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
					{step !== "people" && (
						<BackwardButton onClick={handleBackward} />
					)}
				</Layout.Header>

				<Layout.Content>
					{step === "people" && <PeopleStep onNext={next} />}
					{step === "date" && <DateStep onNext={next} />}
					{step === "region" && (
						<RegionStep
							onComplete={(accessKey) => {
								router.push(
									`/gathering/create/complete/${accessKey}`,
								);
							}}
						/>
					)}
				</Layout.Content>

				<Toaster
					offset={{ bottom: 96 }}
					mobileOffset={{ bottom: 96 }}
				/>
			</Layout.Root>
		</FormProvider>
	);
}
