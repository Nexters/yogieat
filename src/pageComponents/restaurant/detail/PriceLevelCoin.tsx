"use client";

import { twJoin } from "tailwind-merge";

interface PriceLevelCoinProps {
	active: boolean;
}

export const PriceLevelCoin = ({ active }: PriceLevelCoinProps) => {
	return (
		<span
			aria-hidden="true"
			className={twJoin(
				"ygi:flex ygi:size-6 ygi:items-center ygi:justify-center ygi:rounded-full",
				"ygi:bg-palette-yellow-900 ygi:caption-12-bd",
				active ? "ygi:opacity-100" : "ygi:opacity-30",
			)}
		>
			<span className="ygi:text-text-inverse">₩</span>
		</span>
	);
};
