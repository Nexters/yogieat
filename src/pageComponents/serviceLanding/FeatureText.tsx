"use client";

import { motion } from "motion/react";
import { type ReactNode } from "react";

interface FeatureTextProps {
	caption: string;
	headline: ReactNode;
	isDark: boolean;
	isInView: boolean;
	captionSize?: "sm" | "md";
}

const captionClassName = ({
	captionSize,
	isDark,
}: Pick<FeatureTextProps, "captionSize" | "isDark">) => {
	if (captionSize === "sm") {
		return "ygi:body-14-md ygi:text-palette-gray-700";
	}
	return isDark
		? "ygi:body-16-md ygi:text-palette-gray-300"
		: "ygi:body-16-md ygi:text-palette-gray-500";
};

export const FeatureText = ({
	caption,
	headline,
	isDark,
	isInView,
	captionSize = "md",
}: FeatureTextProps) => (
	<motion.div
		initial={{ opacity: 0, y: 40 }}
		animate={isInView ? { opacity: 1, y: 0 } : {}}
		transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
		className="ygi:flex ygi:flex-col ygi:items-center ygi:gap-2"
	>
		<p
			className={`ygi:text-center ygi:whitespace-pre-line ${captionClassName(
				{ captionSize, isDark },
			)}`}
		>
			{caption}
		</p>
		<p
			className={`ygi:text-center ygi:heading-22-bd ygi:whitespace-pre-line ${
				isDark ? "ygi:text-text-inverse" : "ygi:text-text-primary"
			}`}
		>
			{headline}
		</p>
	</motion.div>
);
