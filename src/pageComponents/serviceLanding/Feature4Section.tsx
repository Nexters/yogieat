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
				<div className="ygi:relative ygi:mt-10 ygi:flex ygi:w-full ygi:flex-col ygi:items-center">
					<motion.div
						initial={{ opacity: 0, y: -16 }}
						animate={isInView ? { opacity: 1, y: 0 } : {}}
						transition={{
							duration: 0.45,
							ease: [0.25, 0.46, 0.45, 0.94],
							delay: 0.2,
						}}
						className="ygi:w-full ygi:max-w-55.75"
					>
						<Image
							src="/images/service-landing/feature-4-banner.png"
							alt="투표 결과 요약"
							width={446}
							height={210}
							className="ygi:w-full"
							priority
						/>
					</motion.div>
					<div className="ygi:mt-6 ygi:flex ygi:w-full ygi:flex-row ygi:items-end ygi:justify-center ygi:gap-2.5">
						<motion.div
							initial={{ opacity: 0, y: 80, scale: 0.88 }}
							animate={
								isInView ? { opacity: 1, y: 0, scale: 1 } : {}
							}
							transition={{
								duration: 0.7,
								ease: [0.25, 0.46, 0.45, 0.94],
								delay: 0.4,
							}}
						>
							<Image
								src="/images/service-landing/feature-4-screen-a.png"
								alt="맛집 추천 화면 1"
								width={148}
								height={252}
								className="ygi:rounded-t-[10px] ygi:shadow-lg"
								priority
							/>
						</motion.div>
						<motion.div
							initial={{ opacity: 0, y: 80, scale: 0.88 }}
							animate={
								isInView ? { opacity: 1, y: 0, scale: 1 } : {}
							}
							transition={{
								duration: 0.7,
								ease: [0.25, 0.46, 0.45, 0.94],
								delay: 0.55,
							}}
						>
							<Image
								src="/images/service-landing/feature-4-screen-b.png"
								alt="맛집 추천 화면 2"
								width={148}
								height={225}
								className="ygi:rounded-t-[10px] ygi:shadow-lg"
								priority
							/>
						</motion.div>
					</div>
				</div>
			</div>
		</section>
	);
};
