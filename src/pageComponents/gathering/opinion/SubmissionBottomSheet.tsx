"use client";

import { useParams } from "next/navigation";

import { ProgressBar } from "#/components/progressBar";
import { useGetGatheringCapacity } from "#/hooks/apis/gathering";

export const SubmissionBottomSheet = () => {
	const { accessKey } = useParams<{ accessKey: string }>();

	const {
		data: { currentCount, maxCount },
	} = useGetGatheringCapacity(accessKey);

	const percentage =
		maxCount > 0 ? Math.round((currentCount / maxCount) * 100) : 0;

	const isComplete = currentCount >= maxCount;

	const title = isComplete
		? `${maxCount}명이 모두 참여했어요`
		: `${maxCount}명 중 ${currentCount}명이 제출했어요`;

	const description = isComplete
		? "모두의 취향을 반영한 추천 결과를 보여드릴게요"
		: "아직 제출하지 않은 모임원에게 알려주세요";

	return (
		<section className="ygi:fixed ygi:bottom-18 ygi:left-0 ygi:z-layout-footer ygi:flex ygi:w-full ygi:justify-center">
			<div className="ygi:w-full ygi:max-w-root-layout ygi:rounded-t-xl ygi:bg-bg-white ygi:px-6 ygi:py-9">
				<div className="ygi:flex ygi:flex-col ygi:gap-5">
					<div className="ygi:flex ygi:items-center ygi:justify-between">
						<span className="ygi:body-18-bd ygi:text-text-primary">
							{title}
						</span>
						<span className="ygi:body-18-bd ygi:text-text-interactive">
							{percentage}%
						</span>
					</div>
					<ProgressBar value={percentage} />
					<p className="ygi:body-14-md ygi:text-text-secondary">
						{description}
					</p>
				</div>
			</div>
		</section>
	);
};
