"use client";

import { useFormContext, useController } from "react-hook-form";
import { motion } from "motion/react";
import { XIcon } from "#/icons/xIcon";
import { cva } from "class-variance-authority";
import { AnimatePresence } from "motion/react";
import { twJoin } from "tailwind-merge";
import Image from "next/image";

import { Category, CATEGORY_LABEL } from "#/constants/gathering/opinion";
import type { OpinionFormSchema } from "#/schemas/gathering";

const dislikedCategoryButtonVariants = cva(
	[
		"ygi:flex ygi:flex-col ygi:items-center ygi:justify-center",
		"ygi:size-[156px] ygi:gap-1 ygi:rounded-full ygi:p-6",
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

interface DislikedCategoryButtonProps {
	category: Category;
}

export const DislikedCategoryButton = ({
	category,
}: DislikedCategoryButtonProps) => {
	const { control } = useFormContext<OpinionFormSchema>();
	const { field } = useController({ name: "dislikedCategories", control });

	const dislikedCategoryList = field.value || [];

	const isSelected = dislikedCategoryList.includes(category);
	const isAny = category === Category.ANY;
	const shouldShowXIcon = isSelected && !isAny;

	const handleClickDislikeButton = () => {
		if (isSelected) {
			field.onChange(
				dislikedCategoryList.filter(
					(dislikedCategory) => dislikedCategory !== category,
				),
			);
			return;
		}

		if (isAny) {
			field.onChange([Category.ANY]);
			return;
		}

		const filteredCategories = dislikedCategoryList.filter(
			(dislikedCategory) => dislikedCategory !== Category.ANY,
		);

		if (filteredCategories.length < 2) {
			field.onChange([...filteredCategories, category]);
			return;
		}
	};

	return (
		<button
			type="button"
			aria-pressed={isSelected}
			className={dislikedCategoryButtonVariants({
				isAny,
				selected: isSelected,
			})}
			onClick={handleClickDislikeButton}
		>
			<div className="ygi:relative ygi:size-20">
				<Image
					src={`/images/foodCategory/${category.toLowerCase()}.svg`}
					alt={CATEGORY_LABEL[category]}
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
				{CATEGORY_LABEL[category]}
			</span>
		</button>
	);
};
