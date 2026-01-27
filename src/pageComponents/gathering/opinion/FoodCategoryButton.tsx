"use client";

import { motion } from "motion/react";
import { XIcon } from "#/icons/xIcon";
import { cva, type VariantProps } from "class-variance-authority";
import { AnimatePresence } from "motion/react";
import type { ComponentPropsWithoutRef } from "react";
import { twJoin } from "tailwind-merge";
import Image from "next/image";

const foodCategoryButtonVariants = cva(
	[
		"ygi:flex ygi:flex-col ygi:items-center ygi:justify-center",
		"ygi:size-[156px] ygi:rounded-full",
		"ygi:gap-1 ygi:p-6",
		"ygi:cursor-pointer ygi:transition",
		"ygi:border ygi:border-solid",
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

export type FoodCategoryButtonProps = Omit<
	ComponentPropsWithoutRef<"button">,
	"className"
> &
	VariantProps<typeof foodCategoryButtonVariants> & {
		category: string;
		label: string;
	};

export const FoodCategoryButton = ({
	category,
	selected,
	label,
	...props
}: FoodCategoryButtonProps) => {
	const isAny = category === "ANY";
	const shouldShowXIcon = selected && !isAny;
	const imageSrc = `/images/foodCategory/${category.toLowerCase()}.svg`;

	return (
		<button
			aria-pressed={selected ?? false}
			className={foodCategoryButtonVariants({ isAny, selected })}
			{...props}
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
					"ygi:heading-18-bd ygi:text-center",
					selected
						? "ygi:text-text-primary"
						: "ygi:text-text-secondary",
				)}
			>
				{label}
			</span>
		</button>
	);
};
