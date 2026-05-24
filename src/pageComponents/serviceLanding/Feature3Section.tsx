"use client";

import { motion } from "motion/react";
import Image from "next/image";

import { FeatureText } from "./FeatureText";
import { useScrollReveal } from "./useScrollReveal";

const feature3Screens = [
	{ name: "feature-3-screen-a", height: 151 },
	{ name: "feature-3-screen-b", height: 146 },
] as const;

export const Feature3Section = () => {
	const { ref, isInView } = useScrollReveal();

	return (
		<section
			ref={ref}
			className="ygi:overflow-hidden ygi:px-6 ygi:py-13.5"
			style={{ backgroundColor: "#d5dae2" }}
		>
			<div className="ygi:mx-auto ygi:flex ygi:flex-col ygi:items-center ygi:gap-10">
				<FeatureText
					caption="다들 뭘 먹고 싶어 했을까?"
					headline="투표 결과로 확인해요"
					isDark={false}
					isInView={isInView}
					captionSize="sm"
				/>
				<div className="ygi:flex ygi:w-full ygi:flex-col ygi:items-center ygi:gap-2.5">
					{feature3Screens.map(({ name, height }, index) => (
						<motion.div
							key={name}
							initial={{ opacity: 0, y: 40 }}
							animate={isInView ? { opacity: 1, y: 0 } : {}}
							transition={{
								duration: 0.55,
								ease: "easeOut",
								delay: 0.3 + index * 0.18,
							}}
							className="ygi:w-full ygi:max-w-57.5"
						>
							<Image
								src={`/images/service-landing/${name}.png`}
								alt={`투표 결과 화면 ${index + 1}`}
								width={654}
								height={Math.round(height * (654 / 228))}
								className="ygi:w-full ygi:shadow-lg"
								priority
							/>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
};
