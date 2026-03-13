"use client";

import { motion } from "motion/react";
import Image from "next/image";

import { FeatureText } from "./FeatureText";
import { useScrollReveal } from "./useScrollReveal";

const feature3Screens = [
	{ name: "feature-3-screen-a", direction: -1, height: 151 },
	{ name: "feature-3-screen-b", direction: 1, height: 146 },
	{ name: "feature-3-screen-c", direction: -1, height: 139 },
];

export const Feature3Section = () => {
	const { ref, isInView } = useScrollReveal();

	return (
		<section
			ref={ref}
			className="ygi:overflow-hidden ygi:bg-palette-gray-100 ygi:px-6 ygi:py-13.5"
		>
			<div className="ygi:mx-auto ygi:flex ygi:flex-col ygi:items-center ygi:gap-10">
				<FeatureText
					caption="친구들은 뭘 먹고 싶어 했을까?"
					headline="투표 결과로 확인해요"
					isDark={false}
					isInView={isInView}
				/>
				<div className="ygi:flex ygi:w-full ygi:flex-col ygi:items-center ygi:gap-2.5">
					{feature3Screens.map(
						({ name, direction, height }, index) => (
							<motion.div
								key={name}
								initial={{ opacity: 0, x: direction * 60 }}
								animate={isInView ? { opacity: 1, x: 0 } : {}}
								transition={{
									duration: 0.65,
									ease: "easeOut",
									delay: 0.3 + index * 0.2,
								}}
								className="ygi:w-full ygi:max-w-57.5"
							>
								<Image
									src={`/images/service-landing/${name}.png`}
									alt={`투표 결과 화면 ${index + 1}`}
									width={654}
									height={height}
									className="ygi:w-full ygi:shadow-lg"
									priority
								/>
							</motion.div>
						),
					)}
				</div>
			</div>
		</section>
	);
};
