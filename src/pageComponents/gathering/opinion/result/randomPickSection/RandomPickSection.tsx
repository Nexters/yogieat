"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { twJoin } from "tailwind-merge";

import { ChevronRightIcon } from "#/icons/chevronRightIcon";

interface RandomPickSectionProps {
	accessKey: string;
}

export const RandomPickSection = ({ accessKey }: RandomPickSectionProps) => {
	const router = useRouter();

	const handleClick = () => {
		router.push(`/gathering/${accessKey}/opinion/result/random-pick`);
	};

	return (
		<section className="ygi:flex ygi:flex-col ygi:gap-3">
			<h2 className="ygi:heading-22-bd ygi:text-text-primary">
				아직도 고민된다면
			</h2>
			<button
				type="button"
				onClick={handleClick}
				className={twJoin(
					"ygi:flex ygi:w-full ygi:items-center ygi:justify-between ygi:gap-5",
					"ygi:rounded-md ygi:bg-surface-white ygi:p-5",
					"ygi:cursor-pointer",
				)}
			>
				<div className="ygi:flex ygi:flex-col ygi:items-start ygi:gap-3">
					<p className="ygi:body-14-bd ygi:text-left ygi:text-text-primary">
						추천 받은 맛집 중에
						<br />
						랜덤으로 뽑아보세요
					</p>
					<div
						className={twJoin(
							"ygi:flex ygi:items-center ygi:gap-0.5",
							"ygi:rounded-full ygi:bg-surface-primary",
							"ygi:py-1 ygi:pl-3 ygi:pr-2",
						)}
					>
						<span className="ygi:caption-12-bd ygi:text-text-interactive">
							랜덤 뽑기
						</span>
						<ChevronRightIcon size={20} color="#FF5A3C" />
					</div>
				</div>
				<div className="ygi:relative ygi:h-24 ygi:w-24 ygi:shrink-0 ygi:overflow-clip ygi:rounded-full ygi:bg-bg-gray">
					<Image
						src="/images/foodCategory/western.svg"
						alt="음식 일러스트"
						fill
						className="ygi:object-contain ygi:p-2"
					/>
				</div>
			</button>
		</section>
	);
};
