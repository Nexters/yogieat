"use client";

import type { ReactNode } from "react";
import { twJoin } from "tailwind-merge";

import { useTabContext } from "./context";

interface ItemProps {
	value: string;
	children: ReactNode;
}

export const Item = ({ value, children }: ItemProps) => {
	const { value: selectedValue, onChange } = useTabContext();
	const isSelected = selectedValue === value;

	return (
		<button
			type="button"
			role="tab"
			aria-selected={isSelected}
			onClick={() => onChange(value)}
			className={twJoin(
				"ygi:flex ygi:items-center ygi:justify-center",
				"ygi:px-2 ygi:py-1",
				"ygi:heading-18-bd ygi:whitespace-nowrap",
				"ygi:cursor-pointer ygi:bg-transparent ygi:transition-colors",
				isSelected ? "ygi:text-text-primary" : "ygi:text-text-disabled",
			)}
		>
			{children}
		</button>
	);
};
