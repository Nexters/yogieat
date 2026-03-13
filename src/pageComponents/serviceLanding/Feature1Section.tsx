"use client";

import { motion } from "motion/react";
import Image from "next/image";

import { FeatureText } from "./FeatureText";
import { useScrollReveal } from "./useScrollReveal";

export const Feature1Section = () => {
	const { ref, isInView } = useScrollReveal();

	return (
		<section
			ref={ref}
			className="ygi:overflow-hidden ygi:bg-palette-gray-100 ygi:px-6 ygi:pt-13.5"
		>
			<div className="ygi:mx-auto ygi:flex ygi:flex-col ygi:items-center">
				<FeatureText
					caption="모임 링크 만들기"
					headline="우리 모임 정보 입력 한번에"
					isDark={false}
					isInView={isInView}
				/>
				{/* overflow-hidden으로 하단 overflow 초기 상태 클리핑 */}
				<div className="ygi:relative ygi:-bottom-14">
					<motion.div
						initial={{ opacity: 1, y: 72, scale: 0.88 }}
						animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
						transition={{
							duration: 0.7,
							ease: [0.25, 0.46, 0.45, 0.94],
						}}
						className="ygi:flex ygi:flex-row ygi:gap-3"
					>
						{(
							[
								"feature-1-screen-a",
								"feature-1-screen-b",
							] as const
						).map((name) => (
							<Image
								key={name}
								src={`/images/service-landing/${name}.png`}
								alt="모임 생성 화면"
								width={148}
								height={241}
								className="ygi:rounded-[10px] ygi:shadow-lg"
								priority
							/>
						))}
					</motion.div>
				</div>
			</div>
		</section>
	);
};
