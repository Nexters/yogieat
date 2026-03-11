"use client";

import { type ReactNode } from "react";

import { motion } from "motion/react";

interface FeatureTextProps {
	caption: string;
	headline: ReactNode;
	isDark: boolean;
	isInView: boolean;
}

export const FeatureText = ({
	caption,
	headline,
	isDark,
	isInView,
}: FeatureTextProps) => (
	<motion.div
		initial={{ opacity: 0, y: 40 }}
		animate={isInView ? { opacity: 1, y: 0 } : {}}
		transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
		className="ygi:flex ygi:flex-col ygi:items-center ygi:gap-2"
	>
		<p
			className={`ygi:text-center ygi:body-16-md ${
				isDark
					? "ygi:text-palette-gray-300"
					: "ygi:text-palette-gray-500"
			}`}
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
