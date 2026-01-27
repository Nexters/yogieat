import type { OpinionStep, MeetingContext } from ".";

export interface BaseStepProps {
	meetingContext: MeetingContext;
}

export type IntroStepProps = BaseStepProps & {
	step: "intro";
	onNext: () => void;
};

export type DistanceStepProps = BaseStepProps & {
	step: "distance";
	onNext: () => void;
};

export type DislikeStepProps = BaseStepProps & {
	step: "dislike";
	onNext: () => void;
};

export type PreferenceStepProps = BaseStepProps & {
	step: "preference";
	onComplete: () => void;
};

export type StepComponentProps =
	| IntroStepProps
	| DistanceStepProps
	| DislikeStepProps
	| PreferenceStepProps;

export interface StepRendererProps {
	step: OpinionStep;
	meetingContext: MeetingContext;
	onNext: () => void;
	onComplete: () => void;
}

export interface StepLayoutProps {
	step: OpinionStep;
	children: React.ReactNode;
	onBackward: () => void;
	isFirstStep: boolean;
	footerContent?: React.ReactNode;
}
