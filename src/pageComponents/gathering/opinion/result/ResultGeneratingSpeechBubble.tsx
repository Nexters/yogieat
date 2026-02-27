import { motion } from "motion/react";

export const ResultGeneratingSpeechBubble = () => {
	return (
		<motion.div
			className="ygi:flex ygi:flex-col ygi:items-center"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: [0, 1, 1, 0], y: [20, 0, 0, -10] }}
			transition={{
				duration: 2,
				times: [0, 0.3, 0.7, 1],
				ease: "easeOut",
				repeat: Infinity,
				repeatDelay: 0.5,
			}}
		>
			<div className="ygi:flex ygi:items-start ygi:gap-0 ygi:rounded-md ygi:bg-gray-700 ygi:px-2 ygi:py-1">
				<p className="ygi:caption-12-sb ygi:whitespace-nowrap ygi:text-text-inverse">
					꼬르륵~
				</p>
			</div>
			<svg
				width="10"
				height="6"
				viewBox="0 0 10 6"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				className="ygi:-mt-0.5"
			>
				<path d="M5 6L0.669873 0.75L9.33013 0.75L5 6Z" fill="#374151" />
			</svg>
		</motion.div>
	);
};
