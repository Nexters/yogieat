"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";

import { trackViewPage } from "#/components/analytics";
import { Layout } from "#/components/layout";
import { StepHeader } from "#/components/stepHeader";
import { Toaster } from "#/components/toast";
import { useProceedRecommendResult } from "#/hooks/gathering";

import { SubmissionBottomSheet } from "../SubmissionBottomSheet";
import { FoodCategoryCarousel } from "./FoodCategoryCarousel";
import { ShowResultButton } from "./ShowResultButton";

const PAGE_ID = "의견수합_완료";

export function CompletePage() {
	const { accessKey } = useParams<{ accessKey: string }>();

	const { proceed, isPending } = useProceedRecommendResult();

	useEffect(() => {
		if (accessKey) {
			trackViewPage({
				page_id: PAGE_ID,
				group_id: accessKey,
				submit_progress: 100,
			});
		}
	}, [accessKey]);

	return (
		<Layout.Root>
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
						<FoodCategoryCarousel />
					</div>
				</div>
			</Layout.Content>

			<SubmissionBottomSheet />

			<Layout.Footer>
				<div className="ygi:px-6">
					<ShowResultButton
						pageId={PAGE_ID}
						onProceed={proceed}
						isPending={isPending}
					/>
				</div>
			</Layout.Footer>
			<Toaster offset={{ bottom: 96 }} mobileOffset={{ bottom: 96 }} />
		</Layout.Root>
	);
}
