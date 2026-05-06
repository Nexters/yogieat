"use client";

import { twJoin } from "tailwind-merge";

import { ChevronLeftIcon } from "#/icons/chevronLeftIcon";
import { ChevronRightIcon } from "#/icons/chevronRightIcon";

interface NavArrowButtonProps {
	direction: "prev" | "next";
	disabled: boolean;
	onClick: () => void;
}

export const NavArrowButton = ({
	direction,
	disabled,
	onClick,
}: NavArrowButtonProps) => {
	const isPrev = direction === "prev";
	const label = isPrev ? "이전 페이지" : "다음 페이지";
	const Icon = isPrev ? ChevronLeftIcon : ChevronRightIcon;

	return (
		<button
			type="button"
			onClick={onClick}
			disabled={disabled}
			aria-label={label}
			tabIndex={disabled ? -1 : 0}
			className={twJoin(
				"ygi:absolute ygi:top-1/2 ygi:z-10 ygi:-translate-y-1/2",
				"ygi:flex ygi:h-8 ygi:w-8 ygi:items-center ygi:justify-center",
				"ygi:rounded-full ygi:bg-surface-white ygi:shadow-drop",
				"ygi:cursor-pointer ygi:border-none",
				"ygi:pointer-coarse:hidden",
				"ygi:opacity-0 ygi:transition-opacity",
				"ygi:group-hover/carousel:opacity-100",
				"ygi:focus-visible:opacity-100",
				disabled && "ygi:cursor-default ygi:opacity-30!",
				isPrev
					? "ygi:left-0 ygi:-translate-x-1/2"
					: "ygi:right-0 ygi:translate-x-1/2",
			)}
		>
			<Icon size={20} />
		</button>
	);
};
