"use client";

import { useFormContext, useController } from "react-hook-form";
import { motion } from "motion/react";
import { XIcon } from "#/icons/xIcon";
import { cva } from "class-variance-authority";
import { AnimatePresence } from "motion/react";
import { twJoin } from "tailwind-merge";
import Image from "next/image";

import { FOOD_CATEGORY_LABELS } from "#/constants/gathering/opinion";
import type { FoodCategory } from "#/types/gathering";
import type { OpinionFormSchema } from "#/schemas/gathering";

const dislikedFoodButtonVariants = cva(
	[
		"ygi:flex ygi:flex-col ygi:items-center ygi:justify-center",
		"ygi:size-[156px] ygi:rounded-full",
		"ygi:gap-1 ygi:p-6",
		"ygi:cursor-pointer ygi:transition",
		"ygi:border ygi:border-solid ygi:bg-surface-lightgray",
	],
	{
		variants: {
			isAny: {
				false: [],
				true: [],
			},
			selected: {
				false: [
					"ygi:bg-surface-lightgray-50",
					"ygi:border-transparent",
				],
				true: ["ygi:border-border-primary", "ygi:bg-surface-primary"],
			},
		},
		compoundVariants: [
			{
				isAny: true,
				selected: true,
				class: [
					"ygi:border-border-secondary",
					"ygi:bg-surface-secondary",
				],
			},
		],
		defaultVariants: {
			isAny: false,
			selected: false,
		},
	},
);

interface DislikedFoodButtonProps {
	category: FoodCategory;
}

export const DislikedFoodButton = ({ category }: DislikedFoodButtonProps) => {
	const { control } = useFormContext<OpinionFormSchema>();
	const { field } = useController({ name: "dislikedFoods", control });

	const dislikedFoods = field.value || [];
	const isSelected = dislikedFoods.includes(category);
	const isAny = category === "ANY";
	const shouldShowXIcon = isSelected && !isAny;
	const imageSrc = `/images/foodCategory/${category.toLowerCase()}.svg`;
	const label = FOOD_CATEGORY_LABELS[category];

	return (
		<button
			type="button"
			aria-pressed={isSelected}
			className={dislikedFoodButtonVariants({ isAny, selected: isSelected })}
			onClick={() => field.onChange([category])}
		>
			<div className="ygi:relative ygi:size-20">
				<Image
					src={imageSrc}
					alt={label}
					fill
					className="ygi:object-contain"
					priority
				/>
				<AnimatePresence>
					{shouldShowXIcon && (
						<motion.div
							initial={{ opacity: 0, scale: 0.8 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.8 }}
							transition={{ duration: 0.2, ease: "easeInOut" }}
							className="ygi:absolute ygi:top-0 ygi:left-0 ygi:flex ygi:size-20 ygi:items-center ygi:justify-center"
						>
							<XIcon
								size={80}
								className="ygi:stroke-border-primary-opacity"
								strokeWidth={8}
							/>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
			<span
				className={twJoin(
					"ygi:text-center ygi:heading-18-bd",
					isSelected
						? "ygi:text-text-primary"
						: "ygi:text-text-secondary",
				)}
			>
				{label}
			</span>
		</button>
	);
};
