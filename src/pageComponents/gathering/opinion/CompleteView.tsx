"use client";

import { Layout } from "#/components/layout";
import { StepHeader } from "#/components/stepHeader";
import { CategoryCarousel } from "./CategoryCarousel";

export const CompleteView = () => {
	return (
		<Layout.Content background="gray">
			<div className="ygi:flex ygi:h-full ygi:flex-col">
				<div className="ygi:px-6">
					<StepHeader.Root>
						<StepHeader.Title>
							메뉴 선택이 끝났어요!
						</StepHeader.Title>
						<StepHeader.Description>
							추천 결과를 확인해 보세요
						</StepHeader.Description>
					</StepHeader.Root>
				</div>
				<div className="ygi:mb-43 ygi:flex ygi:w-full ygi:flex-1 ygi:flex-col ygi:justify-center">
					<CategoryCarousel />
				</div>
			</div>
		</Layout.Content>
	);
};
