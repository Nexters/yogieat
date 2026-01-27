"use client";

import { useState, useCallback } from "react";
import type { CreateMeetingStep } from "#/types/gathering";

const STEP_ORDER: CreateMeetingStep[] = ["people", "date", "location"];

export function useCreateMeetingFunnel() {
	const [step, setStep] = useState<CreateMeetingStep>("people");

	const next = useCallback(() => {
		const currentIndex = STEP_ORDER.indexOf(step);
		if (currentIndex < STEP_ORDER.length - 1) {
			setStep(STEP_ORDER[currentIndex + 1]);
		}
	}, [step]);

	const back = useCallback(() => {
		const currentIndex = STEP_ORDER.indexOf(step);
		if (currentIndex > 0) {
			setStep(STEP_ORDER[currentIndex - 1]);
		}
	}, [step]);

	const isFirstStep = step === STEP_ORDER[0];

	return {
		step,
		next,
		back,
		isFirstStep,
	};
}
