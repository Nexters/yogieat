"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, animate } from "motion/react";
import { FoodCard } from "./FoodCard";
import { FOOD_CATEGORY_VALUES } from "#/constants/gathering/opinion";

const CARD_WIDTH = 200;
const GAP = 16;

const ANIMATION_DURATION = 0.4;
const PAUSE_DURATION = 600;

export const FoodCategoryCarousel = () => {
	const totalCount = FOOD_CATEGORY_VALUES.length;
	const items = [
		...FOOD_CATEGORY_VALUES,
		...FOOD_CATEGORY_VALUES,
		...FOOD_CATEGORY_VALUES,
	];

	const x = useMotionValue(0);
	const indexRef = useRef(totalCount);
	const containerRef = useRef<HTMLDivElement>(null);

	const getTargetX = (index: number) => {
		const containerWidth = containerRef.current?.offsetWidth ?? 0;
		return containerWidth / 2 - CARD_WIDTH / 2 - index * (CARD_WIDTH + GAP);
	};

	useLayoutEffect(() => {
		x.set(getTargetX(indexRef.current));

		const moveToNextStep = async () => {
			indexRef.current += 1;

			await animate(x, getTargetX(indexRef.current), {
				duration: ANIMATION_DURATION,
				ease: "easeOut",
			});

			if (indexRef.current >= totalCount * 2) {
				indexRef.current -= totalCount;
				x.jump(getTargetX(indexRef.current));
			}
		};

		const interval = setInterval(
			moveToNextStep,
			PAUSE_DURATION + ANIMATION_DURATION * 1000,
		);

		return () => clearInterval(interval);
	}, [totalCount, x]);

	return (
		<motion.div
			ref={containerRef}
			className="ygi:relative ygi:w-full"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.3, ease: "easeOut" }}
		>
			<div className="ygi:pointer-events-none ygi:absolute ygi:-top-9 ygi:left-[calc(50%-122px)] ygi:z-10">
				<Image
					src="/images/opinion/chopstick.svg"
					alt=""
					width={58}
					height={82}
					loading="eager"
				/>
			</div>

			<div className="ygi:pointer-events-none ygi:absolute ygi:-bottom-6.5 ygi:left-[calc(50%+72px)] ygi:z-10">
				<Image
					src="/images/opinion/spoon.svg"
					alt=""
					width={96}
					height={96}
					loading="eager"
				/>
			</div>

			<div className="ygi:w-full ygi:overflow-hidden">
				<motion.div className="ygi:flex ygi:gap-4" style={{ x }}>
					{items.map((category, index) => (
						<FoodCard
							key={`${category}-${index}`}
							category={category}
						/>
					))}
				</motion.div>
			</div>
		</motion.div>
	);
};
