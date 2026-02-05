"use client";

import { useState, useCallback, useMemo } from "react";
import {
	OPINION_STEP_ORDER,
	OPINION_FORM_STEP_ORDER,
} from "#/constants/gathering/opinion";
import type { OpinionStep } from "#/types/gathering";

interface UseOpinionFunnelOptions {
	skipIntro?: boolean;
}

export function useOpinionFunnel(options: UseOpinionFunnelOptions = {}) {
	const { skipIntro = false } = options;

	const stepOrder = useMemo(
		() => (skipIntro ? OPINION_FORM_STEP_ORDER : OPINION_STEP_ORDER),
		[skipIntro],
	);

	const initialStep = stepOrder[0];
	const [step, setStep] = useState<OpinionStep>(initialStep);
	const [direction, setDirection] = useState<"forward" | "backward">(
		"forward",
	);

	const next = useCallback(() => {
		setDirection("forward");
		const currentIndex = stepOrder.indexOf(step);
		if (currentIndex < stepOrder.length - 1) {
			setStep(stepOrder[currentIndex + 1]);
		}
	}, [step, stepOrder]);

	const back = useCallback(() => {
		setDirection("backward");
		const currentIndex = stepOrder.indexOf(step);
		if (currentIndex > 0) {
			setStep(stepOrder[currentIndex - 1]);
		}
	}, [step, stepOrder]);

	const isFirstStep = step === stepOrder[0];
	const isLastStep = step === stepOrder[stepOrder.length - 1];

	return {
		step,
		direction,
		next,
		back,
		isFirstStep,
		isLastStep,
	};
}
