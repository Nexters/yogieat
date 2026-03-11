interface SpeechBubbleProps {
	text: string;
	direction: "left" | "right";
	variant: "primary" | "white";
}

export const SpeechBubble = ({ text, direction, variant }: SpeechBubbleProps) => {
	const isPrimary = variant === "primary";
	const bg = isPrimary ? "#FF5A3C" : "white";
	const textColor = isPrimary ? "white" : "#111827";

	// 둥글게 뾰족하게 커브진 말풍선 꼬리
	const TailLeft = () => (
		<svg
			width="7"
			height="12"
			viewBox="0 0 7 12"
			fill="none"
			aria-hidden="true"
			style={{ flexShrink: 0 }}
		>
			<path d="M7 0 C7 0 1 4.5 0 6 C1 7.5 7 12 7 12 Z" fill={bg} />
		</svg>
	);
	const TailRight = () => (
		<svg
			width="7"
			height="12"
			viewBox="0 0 7 12"
			fill="none"
			aria-hidden="true"
			style={{ flexShrink: 0 }}
		>
			<path d="M0 0 C0 0 6 4.5 7 6 C6 7.5 0 12 0 12 Z" fill={bg} />
		</svg>
	);

	return (
		<div className="ygi:flex ygi:items-center" style={{ gap: 0 }}>
			{direction === "left" && <TailLeft />}
			<div
				className="ygi:rounded-sm ygi:px-3 ygi:py-1.5 ygi:caption-12-sb"
				style={{ backgroundColor: bg, color: textColor }}
			>
				{text}
			</div>
			{direction === "right" && <TailRight />}
		</div>
	);
};
