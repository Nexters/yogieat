"use client";

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

				<div className="ygi:mt-12 ygi:flex ygi:h-61 ygi:w-61 ygi:items-center ygi:justify-center ygi:rounded-2xl ygi:bg-gray-200">
					<span className="ygi:body-14-rg ygi:text-text-secondary">
						이미지 준비 중
					</span>
				</div>
			</div>
		</Layout.Content>
	);
};
