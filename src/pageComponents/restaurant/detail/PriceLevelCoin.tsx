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
				"ygi:body-12-bd ygi:bg-palette-yellow-900",
				active ? "ygi:opacity-100" : "ygi:opacity-30",
			)}
		>
			<span className="ygi:text-text-inverse">₩</span>
		</span>
	);
};
