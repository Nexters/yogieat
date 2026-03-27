"use client";

import Image from "next/image";
import { useState } from "react";

import { ArrowLeftIcon } from "#/icons/arrowLeftIcon";

import { FeedbackBottomSheet } from "./FeedbackBottomSheet";

interface FeedbackSectionProps {
	accessKey: string;
}

export const FeedbackSection = ({ accessKey }: FeedbackSectionProps) => {
	const [open, setOpen] = useState(false);

	return (
		<>
			<button
				type="button"
				onClick={() => setOpen(true)}
				className="ygi:flex ygi:w-full ygi:cursor-pointer ygi:items-center ygi:justify-between ygi:gap-5 ygi:rounded-md ygi:bg-surface-white ygi:p-5"
			>
				<div className="ygi:flex ygi:flex-1 ygi:flex-col ygi:items-start ygi:gap-3">
					<p className="ygi:text-left ygi:body-14-bd ygi:whitespace-pre-line ygi:text-text-primary">
						{"여러분의 목소리에\n귀를 기울이고 있어요!"}
					</p>
					<div className="ygi:flex ygi:items-center ygi:gap-1 ygi:rounded-full ygi:bg-palette-primary-50 ygi:py-1 ygi:pr-2 ygi:pl-3">
						<span className="ygi:caption-12-bd ygi:text-palette-primary-500">
							의견 제안하기
						</span>
						<ArrowLeftIcon
							size={16}
							color="#FF5A3C"
							aria-hidden="true"
							className="ygi:rotate-180"
						/>
					</div>
				</div>
				<div className="ygi:relative ygi:size-22 ygi:shrink-0 ygi:overflow-hidden ygi:rounded-full ygi:bg-surface-lightgray">
					<div className="ygi:absolute ygi:inset-x-0 ygi:top-4 ygi:-bottom-5">
						<Image
							src="/images/feedback/illustration.svg"
							alt="의견 제안 일러스트"
							fill
							className="ygi:object-cover"
						/>
					</div>
				</div>
			</button>

			<FeedbackBottomSheet
				open={open}
				onOpenChange={setOpen}
				accessKey={accessKey}
			/>
		</>
	);
};
