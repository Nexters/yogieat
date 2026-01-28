"use client";

import dynamic from "next/dynamic";
import { Layout } from "#/components/layout";
import { StepHeader } from "#/components/stepHeader";
import { twJoin } from "tailwind-merge";

const Player = dynamic(
	() =>
		import("@lottiefiles/react-lottie-player").then(
			(module) => module.Player,
		),
	{ ssr: false },
);

export const PendingView = () => {
	return (
		<Layout.Content background="gray">
			<div
				className={twJoin(
					"ygi:flex ygi:flex-col ygi:items-center",
					"ygi:h-full ygi:px-6 ygi:pt-3",
				)}
			>
				<StepHeader.Root>
					<StepHeader.Title>
						메뉴 추천을 준비하고 있어요!
					</StepHeader.Title>
					<StepHeader.Description>
						모든 의견이 모이면 추천 결과를 보여드릴게요
					</StepHeader.Description>
				</StepHeader.Root>

				<div className="ygi:item-center ygi:mb-43 ygi:flex ygi:w-full ygi:flex-1 ygi:flex-col ygi:justify-end">
					<Player
						autoplay
						loop
						src="/lotties/opinion-submission.json"
						style={{ width: 280, height: 300 }}
					/>
				</div>
			</div>
		</Layout.Content>
	);
};
