"use client";

import { motion } from "motion/react";
import Image from "next/image";

import { useScrollReveal } from "./useScrollReveal";

export const TasteHitSection = () => {
	const { ref, isInView } = useScrollReveal();

	return (
		<section
			ref={ref}
			className="ygi:overflow-hidden ygi:bg-palette-gray-800 ygi:px-6 ygi:pt-13.5"
		>
			<div className="ygi:mx-auto ygi:flex ygi:flex-col ygi:items-center">
				<motion.p
					initial={{ opacity: 0, y: 40 }}
					animate={isInView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
					className="ygi:text-center ygi:heading-22-bd ygi:whitespace-pre-line ygi:text-text-inverse"
				>
					{"이제는 모두의 취향을 저격할\n맛집을 쉽게 추천 받아요"}
				</motion.p>
				<div className="ygi:relative ygi:mt-[42px]">
					<motion.div
						initial={{ opacity: 1, y: 72, scale: 0.88 }}
						animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
						transition={{
							duration: 0.7,
							ease: [0.25, 0.46, 0.45, 0.94],
						}}
					>
						<Image
							src="/images/service-landing/feature-1-taste-card.png"
							alt="취향 저격 맛집 추천 카드"
							width={750}
							height={1204}
							className="ygi:w-50 ygi:rounded-t-[10px] ygi:shadow-lg"
							priority
						/>
					</motion.div>
				</div>
			</div>
		</section>
	);
};
