"use client";

import { useCallback, useState } from "react";

import type { AloneStep } from "#/types/gathering";

const ALONE_STEP_ORDER: AloneStep[] = ["region", "preference", "dislike"];

export function useAloneFunnel() {
	const [step, setStep] = useState<AloneStep>(ALONE_STEP_ORDER[0]);
	const [direction, setDirection] = useState<"forward" | "backward">(
		"forward",
	);

	const next = useCallback(() => {
		setDirection("forward");
		const currentIndex = ALONE_STEP_ORDER.indexOf(step);
		if (currentIndex < ALONE_STEP_ORDER.length - 1) {
			setStep(ALONE_STEP_ORDER[currentIndex + 1]);
		}
	}, [step]);

	const back = useCallback(() => {
		setDirection("backward");
		const currentIndex = ALONE_STEP_ORDER.indexOf(step);
		if (currentIndex > 0) {
			setStep(ALONE_STEP_ORDER[currentIndex - 1]);
		}
	}, [step]);

	const isFirstStep = step === ALONE_STEP_ORDER[0];
	const isLastStep = step === ALONE_STEP_ORDER[ALONE_STEP_ORDER.length - 1];

	return {
		step,
		direction,
		next,
		back,
		isFirstStep,
		isLastStep,
	};
}
