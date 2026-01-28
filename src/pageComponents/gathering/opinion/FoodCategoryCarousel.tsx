"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, animate } from "motion/react";
import { FoodCard } from "./FoodCard";

const FOOD_CATEGORIES = [
	"korean",
	"japanese",
	"chinese",
	"western",
	"asian",
	"any",
];

const CARD_WIDTH = 200;
const GAP = 16;

const ANIMATION_DURATION = 0.4;
const PAUSE_DURATION = 600;

export const FoodCategoryCarousel = () => {
	const totalCount = FOOD_CATEGORIES.length;
	const items = [...FOOD_CATEGORIES, ...FOOD_CATEGORIES, ...FOOD_CATEGORIES];

	const x = useMotionValue(0);
	const indexRef = useRef(totalCount);
	const containerRef = useRef<HTMLDivElement>(null);

	const getTargetX = (index: number) => {
		const containerWidth = containerRef.current?.offsetWidth ?? 0;
		return containerWidth / 2 - CARD_WIDTH / 2 - index * (CARD_WIDTH + GAP);
	};

	useLayoutEffect(() => {
		x.set(getTargetX(indexRef.current));

		if (containerRef.current) {
			containerRef.current.style.opacity = "1";
		}

		const step = async () => {
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
			step,
			PAUSE_DURATION + ANIMATION_DURATION * 1000,
		);

		return () => clearInterval(interval);
	}, [totalCount]);

	return (
		<div
			ref={containerRef}
			className="ygi:relative ygi:w-full"
			style={{ opacity: 0, transition: "opacity 0.3s ease-out" }}
		>
			<div
				className="ygi:pointer-events-none ygi:absolute ygi:z-10"
				style={{ top: -36, left: "calc(50% - 122px)" }}
			>
				<Image
					src="/images/opinion/chopstick.svg"
					alt=""
					width={58}
					height={82}
					loading="eager"
				/>
			</div>

			<div
				className="ygi:pointer-events-none ygi:absolute ygi:z-10"
				style={{ bottom: -26, left: "calc(50% + 72px)" }}
			>
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
		</div>
	);
};
