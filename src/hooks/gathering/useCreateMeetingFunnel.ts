"use client";

import { useState, useCallback } from "react";
import type { CreateMeetingStep } from "#/types/gathering";

const STEP_ORDER: CreateMeetingStep[] = ["people", "date", "region"];

export function useCreateMeetingFunnel() {
	const [step, setStep] = useState<CreateMeetingStep>("people");
	const [direction, setDirection] = useState<"forward" | "backward">(
		"forward",
	);

	const next = useCallback(() => {
		setDirection("forward");
		const currentIndex = STEP_ORDER.indexOf(step);
		if (currentIndex < STEP_ORDER.length - 1) {
			setStep(STEP_ORDER[currentIndex + 1]);
		}
	}, [step]);

	const back = useCallback(() => {
		setDirection("backward");
		const currentIndex = STEP_ORDER.indexOf(step);
		if (currentIndex > 0) {
			setStep(STEP_ORDER[currentIndex - 1]);
		}
	}, [step]);

	const isFirstStep = step === STEP_ORDER[0];

	return {
		step,
		direction,
		next,
		back,
		isFirstStep,
	};
}
