"use client";

import { cva } from "class-variance-authority";
import { useCheckBoxContext } from "./context";

const indicatorVariants = cva(
	[
		"ygi:flex ygi:items-center ygi:justify-center",
		"ygi:h-6 ygi:w-6 ygi:rounded-lg",
		"ygi:transition-colors",
	],
	{
		variants: {
			checked: {
				false: "ygi:border ygi:border-border-default ygi:bg-white ygi:stroke-border-default",
				true: "ygi:bg-surface-active ygi:stroke-icon-inverse",
			},
		},
		defaultVariants: {
			checked: false,
		},
	},
);

export const Indicator = () => {
	const { checked } = useCheckBoxContext();

	return (
		<div className={indicatorVariants({ checked })}>
			<svg
				width="14"
				height="10"
				viewBox="0 0 14 10"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M1 5L5 9L13 1"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		</div>
	);
};
