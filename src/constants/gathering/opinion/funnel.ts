import type { OpinionStep } from "#/types/gathering";

export const OPINION_STEP_ORDER: OpinionStep[] = [
	"nickname",
	"distance",
	"dislike",
	"preference",
];

// NOTE : Opinion Form 에서 Nickname 은 Step Indicator 에 포함되지 않아 제거
export const OPINION_TOTAL_STEPS = 3;
