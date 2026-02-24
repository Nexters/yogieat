"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";

interface PeopleIllustrationProps {
	count: number | null;
}

export const PeopleIllustration = ({ count }: PeopleIllustrationProps) => {
	if (!count || count < 1 || count > 10) return null;

	return (
		<AnimatePresence mode="wait">
			<motion.div
				key={count}
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: 10 }}
				transition={{
					duration: 0.2,
					ease: "easeOut",
				}}
				className="ygi:flex ygi:h-full ygi:items-center ygi:justify-center"
			>
				<Image
					src={`/images/people/person${count}.svg`}
					alt={`${count}명의 사람들`}
					width={375}
					height={180}
					priority
				/>
			</motion.div>
		</AnimatePresence>
	);
};
