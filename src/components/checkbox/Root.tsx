"use client";

import { useMemo, type ReactNode } from "react";

import { CheckBoxContext } from "./context";
import { twMerge } from "tailwind-merge";

interface CheckBoxRootProps {
	checked: boolean;
	disabled?: boolean;
	onCheckedChange: (checked: boolean) => void;
	children: ReactNode;
}

export const Root = ({
	checked,
	disabled = false,
	onCheckedChange,
	children,
}: CheckBoxRootProps) => {
	const handleClick = () => {
		if (!disabled) {
			onCheckedChange(!checked);
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			handleClick();
		}
	};

	const contextValue = useMemo(
		() => ({ checked, disabled }),
		[checked, disabled],
	);

	return (
		<CheckBoxContext.Provider value={contextValue}>
			<div
				role="checkbox"
				aria-checked={checked}
				aria-disabled={disabled}
				tabIndex={disabled ? -1 : 0}
				onClick={handleClick}
				onKeyDown={handleKeyDown}
				className={twMerge(
					"ygi:inline-flex ygi:cursor-pointer ygi:items-center ygi:gap-2 ygi:select-none",
					disabled && "ygi:cursor-not-allowed ygi:opacity-50",
				)}
			>
				{children}
			</div>
		</CheckBoxContext.Provider>
	);
};
