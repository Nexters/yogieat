"use client";

import { motion } from "motion/react";
import Image from "next/image";

import { FeatureText } from "./FeatureText";
import { useScrollReveal } from "./useScrollReveal";

export const Feature4Section = () => {
	const { ref, isInView } = useScrollReveal();

	return (
		<section
			ref={ref}
			className="ygi:overflow-hidden ygi:bg-palette-gray-700 ygi:px-6 ygi:pt-13.5"
		>
			<div className="ygi:mx-auto ygi:flex ygi:max-w-300 ygi:flex-col ygi:items-center">
				<FeatureText
					caption="투표 결과에 따라"
					headline="모임에 맞게 맛집 추천해요"
					isDark={true}
					isInView={isInView}
				/>
				<div className="ygi:relative ygi:-bottom-8 ygi:flex ygi:flex-col ygi:items-center ygi:gap-4">
					{/* 투표 필터 요약 카드 - 아래에서 위로 fade + scale */}
					<motion.div
						initial={{ opacity: 0, y: 40, scale: 0.5 }}
						animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
						transition={{
							duration: 0.45,
							ease: [0.25, 0.46, 0.45, 0.94],
							delay: 0.2,
						}}
						className="ygi:mx-auto ygi:w-full ygi:max-w-55.25"
					>
						<Image
							src="/images/service-landing/feature-4-tooltip.png"
							alt="투표 결과 요약"
							width={654}
							height={247}
							className="ygi:w-full"
							priority
						/>
					</motion.div>
					{/* 맛집 추천 리스트 - bottom overflow + scale 등장 */}
					<div className="ygi:relative">
						<motion.div
							initial={{ opacity: 1, y: 80, scale: 0.88 }}
							animate={
								isInView ? { opacity: 1, y: 0, scale: 1 } : {}
							}
							transition={{
								duration: 0.75,
								ease: [0.25, 0.46, 0.45, 0.94],
								delay: 0.4,
							}}
							className="ygi:w-full ygi:max-w-65.5"
						>
							<Image
								src="/images/service-landing/feature-4-screen.png"
								alt="맛집 추천 화면"
								width={654}
								height={752}
								className="ygi:w-full  ygi:shadow-2xl"
								priority
							/>
						</motion.div>
					</div>
				</div>
			</div>
		</section>
	);
};
