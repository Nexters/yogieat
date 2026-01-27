"use client";

import { Layout } from "#/components/layout";
import { StepHeader } from "#/components/stepHeader";
import { twJoin } from "tailwind-merge";

export interface CompleteNotificationViewProps {
	gatheringId: string;
	totalCount: number;
}

const FOOD_PLACEHOLDERS = [
	{ id: 1, color: "ygi:bg-red-100" },
	{ id: 2, color: "ygi:bg-orange-100" },
	{ id: 3, color: "ygi:bg-yellow-100" },
	{ id: 4, color: "ygi:bg-green-100" },
	{ id: 5, color: "ygi:bg-blue-100" },
	{ id: 6, color: "ygi:bg-purple-100" },
];

export const CompleteNotificationView = () => {
	return (
		<Layout.Content background="gray">
			{/* Header Section */}
			<div className="ygi:px-6 ygi:pt-3">
				<StepHeader.Root>
					<StepHeader.Title>메뉴 선택이 끝났어요!</StepHeader.Title>
					<StepHeader.Description>
						추천 결과를 확인해 보세요
					</StepHeader.Description>
				</StepHeader.Root>
			</div>

			{/* Food Carousel Section */}
			<div className="ygi:mt-8 ygi:flex-1 ygi:overflow-hidden">
				<div className="ygi:scrollbar-hide ygi:flex ygi:gap-3 ygi:overflow-x-auto ygi:px-6">
					{FOOD_PLACEHOLDERS.map((item) => (
						<div
							key={item.id}
							className={twJoin(
								"ygi:flex ygi:h-50 ygi:w-45 ygi:shrink-0 ygi:items-center ygi:justify-center",
								"ygi:rounded-[20px] ygi:bg-surface-white",
								item.color,
							)}
						>
							<span className="ygi:text-text-tertiary ygi:body-14-md">
								🍽️
							</span>
						</div>
					))}
				</div>
			</div>
		</Layout.Content>
	);
};
