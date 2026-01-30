"use client";

import { format, parse } from "date-fns";

import type { GetGatheringResponse } from "#/apis/gathering";
import { LogoIcon } from "#/icons/logoIcon";
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

interface IntroStepProps {
	scheduledDate: GetGatheringResponse["scheduledDate"];
}

export const IntroStep = ({ scheduledDate }: IntroStepProps) => {
	const formattedScheduledDate = format(
		parse(scheduledDate, "yyyy-MM-dd", new Date()),
		"yyyy년 MM월 dd일 약속",
	);

	return (
		<section className="ygi:flex ygi:h-full ygi:flex-col ygi:bg-clip-padding">
			<div className="ygi:flex ygi:flex-col ygi:gap-6 ygi:px-6">
				<LogoIcon className="ygi:text-button-secondary" />
				<h1 className="ygi:display-24-bd ygi:whitespace-pre-line ygi:text-text-primary">
					메뉴 고르기 어려우시죠?
					<br />
					취향만 입력해 주세요
				</h1>
				<div className="ygi:inline-flex ygi:w-fit ygi:items-center ygi:justify-center ygi:rounded-full ygi:bg-button-secondary ygi:px-4 ygi:py-2">
					<span className="ygi:body-16-bd ygi:text-text-inverse">
						{formattedScheduledDate}
					</span>
				</div>
			</div>
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
						src="/lotties/opinion-landing.json"
						style={{ width: "100%", height: "100%" }}
					/>
				</motion.div>
			</AnimatePresence>
		</section>
	);
};
