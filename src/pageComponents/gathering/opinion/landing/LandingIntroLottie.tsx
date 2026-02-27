"use client";

import { AnimatePresence, motion } from "motion/react";
import dynamic from "next/dynamic";

const Player = dynamic(
	() =>
		import("@lottiefiles/react-lottie-player").then(
			(module) => module.Player,
		),
	{
		ssr: false,
		loading: () => <div className="ygi:h-full ygi:w-full" />,
	},
);

export const LandingIntroLottie = () => {
	return (
		<AnimatePresence>
			<motion.div
				className="ygi:flex ygi:flex-1 ygi:items-center ygi:justify-center"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.3, ease: "easeOut" }}
			>
				<Player
					autoplay
					loop
					src="/lotties/create-landing.json"
					style={{ width: "100%", height: "100%" }}
				/>
			</motion.div>
		</AnimatePresence>
	);
};
