"use client";

import { motion } from "motion/react";
import { FoodCard } from "./FoodCard";

const FOOD_CATEGORIES = [
	"korean",
	"japanese",
	"chinese",
	"western",
	"asian",
	"any",
];

export const FoodCategoryCarousel = () => {
	// 카드 2세트를 만들어서 무한 스크롤 효과 구현
	const duplicatedCategories = [...FOOD_CATEGORIES, ...FOOD_CATEGORIES];

	return (
		<div className="ygi:relative ygi:w-full ygi:overflow-hidden">
			<motion.div
				className="ygi:flex ygi:gap-4"
				animate={{
					x: [0, -(200 + 16) * FOOD_CATEGORIES.length],
				}}
				transition={{
					x: {
						repeat: Infinity,
						repeatType: "loop",
						duration: 20,
						ease: "linear",
					},
				}}
			>
				{duplicatedCategories.map((category, index) => (
					<FoodCard
						key={`${category}-${index}`}
						category={category}
					/>
				))}
			</motion.div>
		</div>
	);
};
