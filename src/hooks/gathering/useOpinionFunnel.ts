"use client";

import { useState, useCallback } from "react";
import { OPINION_STEP_ORDER } from "#/constants/gathering/opinion";
import type { OpinionStep } from "#/types/gathering";

export function useOpinionFunnel() {
	const [step, setStep] = useState<OpinionStep>("intro");
	const [direction, setDirection] = useState<"forward" | "backward">(
		"forward",
	);

	const next = useCallback(() => {
		setDirection("forward");
		const currentIndex = OPINION_STEP_ORDER.indexOf(step);
		if (currentIndex < OPINION_STEP_ORDER.length - 1) {
			setStep(OPINION_STEP_ORDER[currentIndex + 1]);
		}
	}, [step]);

	const back = useCallback(() => {
		setDirection("backward");
		const currentIndex = OPINION_STEP_ORDER.indexOf(step);
		if (currentIndex > 0) {
			setStep(OPINION_STEP_ORDER[currentIndex - 1]);
		}
	}, [step]);

	const isFirstStep = step === OPINION_STEP_ORDER[0];
	const isLastStep = step === OPINION_STEP_ORDER[OPINION_STEP_ORDER.length - 1];

	return {
		step,
		direction,
		next,
		back,
		isFirstStep,
		isLastStep,
	};
}
