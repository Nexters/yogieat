"use client";

import { LogoIcon } from "#/icons/logoIcon";
import type { IntroStepProps } from "#/types/gathering";
import Image from "next/image";

export const IntroStep = ({ meetingContext }: IntroStepProps) => {
	return (
		<section className="ygi:flex ygi:h-full ygi:flex-col ygi:bg-clip-padding">
			<div className="ygi:flex ygi:flex-col ygi:gap-6 ygi:px-6">
				<LogoIcon className="ygi:text-button-secondary" />
				<h1 className="ygi:display-24-bd ygi:whitespace-pre-line ygi:text-text-primary">
					메뉴 고르기 어려우시죠?
					{"\n"}취향만 입력해 주세요
				</h1>
				<div className="ygi:inline-flex ygi:w-fit ygi:items-center ygi:justify-center ygi:rounded-full ygi:bg-button-secondary ygi:px-4 ygi:py-2">
					<span className="ygi:body-16-bd ygi:text-text-inverse">
						{meetingContext.scheduledDate}
					</span>
				</div>
			</div>
			<div className="ygi:flex ygi:flex-1 ygi:items-center ygi:justify-center">
				<div className="ygi:relative ygi:h-full ygi:w-full">
					<Image
						src="/images/opinion/opinion-intro.svg"
						alt="메뉴 선택 일러스트"
						fill
						className="ygi:object-contain"
						priority
					/>
				</div>
			</div>
		</section>
	);
};
