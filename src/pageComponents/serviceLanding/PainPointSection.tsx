"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";

import { MeetingCompleteIllustration } from "#/components/illustrations/MeetingCompleteIllustration";

export const PainPointSection = () => {
	const ref = useRef<HTMLElement>(null);
	const isInView = useInView(ref, { once: true, amount: 0.2 });

	return (
		<section
			ref={ref}
			className="ygi:bg-palette-gray-800 ygi:px-6 ygi:py-12"
		>
			<p className="ygi:mb-6 ygi:text-center ygi:body-16-md ygi:whitespace-pre-line ygi:text-palette-gray-300">
				{"밥약속 생길 때마다 했던 고민\n\u201c어디가지..?\u201d"}
			</p>
			<motion.div
				initial={{ opacity: 0, translateY: 30, scale: 0.85 }}
				animate={
					isInView ? { opacity: 1, translateY: 0, scale: 1 } : {}
				}
				transition={{ duration: 0.3, delay: 0.3, ease: "easeOut" }}
				className="ygi:mx-auto ygi:flex ygi:flex-col ygi:items-center ygi:text-center"
			>
				<div className="ygi:mb-4 ygi:flex ygi:items-center ygi:justify-center">
					<MeetingCompleteIllustration className="ygi:h-34 ygi:w-34" />
				</div>
				<p className="ygi:heading-22-bd ygi:text-text-inverse">
					이제 5분이면 끝!
				</p>
			</motion.div>
		</section>
	);
};
