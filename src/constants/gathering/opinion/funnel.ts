import type { OpinionStep } from "#/types/gathering";

export const OPINION_STEP_ORDER: OpinionStep[] = [
	"intro",
	"distance",
	"dislike",
	"preference",
];

export const OPINION_FORM_STEP_ORDER: Exclude<OpinionStep, "intro">[] = [
	"distance",
	"dislike",
	"preference",
];

export const OPINION_TOTAL_STEPS = 3;
