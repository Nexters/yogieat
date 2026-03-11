import { colors } from "#/constants/color";
import type { SVGProps } from "react";

const TailLeft = ({ fill }: SVGProps<SVGSVGElement>) => (
	<svg
		width="7"
		height="12"
		viewBox="0 0 7 12"
		fill="none"
		aria-hidden="true"
		style={{ flexShrink: 0 }}
	>
		<path d="M7 0 C7 0 1 4.5 0 6 C1 7.5 7 12 7 12 Z" fill={fill} />
	</svg>
);

const TailRight = ({ fill }: SVGProps<SVGSVGElement>) => (
	<svg
		width="7"
		height="12"
		viewBox="0 0 7 12"
		fill="none"
		aria-hidden="true"
		style={{ flexShrink: 0 }}
	>
		<path d="M0 0 C0 0 6 4.5 7 6 C6 7.5 0 12 0 12 Z" fill={fill} />
	</svg>
);

interface SpeechBubbleProps {
	text: string;
	direction: "left" | "right";
	variant: "primary" | "white";
}

export const SpeechBubble = ({
	text,
	direction,
	variant,
}: SpeechBubbleProps) => {
	const isPrimary = variant === "primary";
	const backgroundColor = isPrimary
		? colors.palette.primary[500]
		: colors.palette.common.white;

	return (
		<div className="ygi:flex ygi:items-center">
			{direction === "left" && <TailLeft fill={backgroundColor} />}
			<div
				className={`ygi:rounded-sm ygi:px-3 ygi:py-1.5 ygi:caption-12-sb ${isPrimary ? "ygi:bg-palette-primary-500 ygi:text-palette-common-white" : "ygi:bg-palette-common-white ygi:text-palette-gray-900"}`}
			>
				{text}
			</div>
			{direction === "right" && <TailRight fill={backgroundColor} />}
		</div>
	);
};
