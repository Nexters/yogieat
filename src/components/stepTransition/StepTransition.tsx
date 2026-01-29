"use client";

import { AnimatePresence, motion } from "motion/react";
import type { ReactNode } from "react";

interface StepTransitionProps {
	step: string;
	direction: "forward" | "backward";
	children: ReactNode;
}

const slideVariants = {
	enter: (direction: "forward" | "backward") => ({
		x: direction === "forward" ? "100%" : "-100%",
		opacity: 0,
	}),
	center: {
		x: 0,
		opacity: 1,
	},
	exit: (direction: "forward" | "backward") => ({
		x: direction === "forward" ? "-100%" : "100%",
		opacity: 0,
	}),
};

export const StepTransition = ({
	step,
	direction,
	children,
}: StepTransitionProps) => {
	return (
		<AnimatePresence mode="wait" custom={direction}>
			<motion.div
				key={step}
				custom={direction}
				variants={slideVariants}
				initial="enter"
				animate="center"
				exit="exit"
				transition={{
					x: { type: "tween", duration: 0.3, ease: "easeOut" },
					opacity: { duration: 0.2 },
				}}
				className="ygi:scrollbar-hide ygi:h-full ygi:w-full ygi:overflow-x-hidden"
			>
				{children}
			</motion.div>
		</AnimatePresence>
	);
};
