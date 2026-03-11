"use client";

import { motion } from "motion/react";
import Image from "next/image";

import { FeatureText } from "./FeatureText";
import { SpeechBubble } from "./SpeechBubble";
import { useScrollReveal } from "./useScrollReveal";

export const Feature5Section = () => {
	const { ref, isInView } = useScrollReveal();

	return (
		<section
			ref={ref}
			className="ygi:px-12.5 ygi:py-13.5"
			style={{ backgroundColor: "#d5dae2" }}
		>
			<div className="ygi:mx-auto ygi:flex ygi:max-w-300 ygi:flex-col ygi:items-center ygi:gap-10">
				<FeatureText
					caption="오래 걸리던 맛집 정하기"
					headline={"이제는 쉽고 편하게 결정해요"}
					isDark={false}
					isInView={isInView}
				/>

				{/* OG 카드 + 말풍선 컨테이너 - 각 요소 개별 순차 애니메이션 */}
				<div className="ygi:relative ygi:w-full ygi:max-w-75 ygi:pt-10 ygi:pb-14">
					{/* ① 오렌지 말풍선 - 좌→우 (delay 0.1s) */}
					<motion.div
						initial={{ opacity: 0, x: -28 }}
						animate={isInView ? { opacity: 1, x: 0 } : {}}
						transition={{
							duration: 0.4,
							ease: "easeOut",
							delay: 0.1,
						}}
						className="ygi:absolute ygi:-top-1 ygi:left-0"
					>
						<SpeechBubble
							text="얘들아 오늘은 여기다"
							direction="left"
							variant="primary"
						/>
					</motion.div>

					{/* ② OG 링크 미리보기 카드 - 좌→우 (delay 0.26s) */}
					<motion.div
						initial={{ opacity: 0, x: -28 }}
						animate={isInView ? { opacity: 1, x: 0 } : {}}
						transition={{
							duration: 0.45,
							ease: "easeOut",
							delay: 0.26,
						}}
						className="ygi:relative ygi:h-49.5 ygi:w-full ygi:max-w-52.75"
					>
						<Image
							src="/images/service-landing/feature-5-og-card.png"
							alt="요기잇 링크 공유 미리보기"
							fill
							priority
						/>
					</motion.div>

					{/* ③ 흰 말풍선 1 - 우→좌 (delay 0.44s) */}
					<motion.div
						initial={{ opacity: 0, x: 28 }}
						animate={isInView ? { opacity: 1, x: 0 } : {}}
						transition={{
							duration: 0.4,
							ease: "easeOut",
							delay: 0.44,
						}}
						className="ygi:absolute ygi:right-0 ygi:bottom-6"
					>
						<SpeechBubble
							text="마싯겠다"
							direction="right"
							variant="white"
						/>
					</motion.div>

					{/* ④ 흰 말풍선 2 - 우→좌 (delay 0.6s) */}
					<motion.div
						initial={{ opacity: 0, x: 28 }}
						animate={isInView ? { opacity: 1, x: 0 } : {}}
						transition={{
							duration: 0.4,
							ease: "easeOut",
							delay: 0.6,
						}}
						className="ygi:absolute ygi:right-0 ygi:-bottom-4"
					>
						<SpeechBubble
							text="당장 고."
							direction="right"
							variant="white"
						/>
					</motion.div>
				</div>
			</div>
		</section>
	);
};
