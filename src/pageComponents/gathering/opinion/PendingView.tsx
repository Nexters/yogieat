"use client";

import Image from "next/image";
import { Layout } from "#/components/layout";
import { StepHeader } from "#/components/stepHeader";
import { twJoin } from "tailwind-merge";

export interface PendingViewProps {
	gatheringId: string;
	totalCount: number;
	submittedCount: number;
}

export const PendingView = ({}: PendingViewProps) => {
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

				<div className="ygi:relative ygi:mt-22 ygi:h-75 ygi:w-70">
					<Image
						src="/images/opinion/prepare-suggestion.svg"
						alt="메뉴 추천 준비중"
						fill
						className="ygi:object-contain"
						priority
					/>
				</div>
			</div>
		</Layout.Content>
	);
};
