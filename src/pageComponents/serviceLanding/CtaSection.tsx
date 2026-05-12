"use client";

import { motion } from "motion/react";
import Link from "next/link";

import { useScrollReveal } from "./useScrollReveal";

export const CtaSection = () => {
	const { ref, isInView } = useScrollReveal();

	return (
		<section
			ref={ref}
			className="ygi:bg-palette-gray-800 ygi:px-6 ygi:py-15.5"
		>
			<motion.div
				initial={{ opacity: 0, y: 40 }}
				animate={isInView ? { opacity: 1, y: 0 } : {}}
				transition={{ duration: 0.6, ease: "easeOut" }}
				className="ygi:mx-auto ygi:flex ygi:flex-col ygi:items-center ygi:gap-10 ygi:text-center"
			>
				<p className="ygi:heading-22-bd ygi:whitespace-pre-line ygi:text-text-inverse">
					{"지금 바로 "}
					<span className="ygi:text-button-secondary">요기잇</span>
					{"으로\n맛집을 추천 받아요"}
				</p>
				<Link
					href="/gathering/create"
					className="ygi:flex ygi:cursor-pointer ygi:items-center ygi:justify-center ygi:rounded-full ygi:bg-white ygi:px-6 ygi:py-3 ygi:heading-18-bd ygi:text-text-primary ygi:transition-colors ygi:hover:bg-white/90"
				>
					바로 시작하기
				</Link>
			</motion.div>
		</section>
	);
};
