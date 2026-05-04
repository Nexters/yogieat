"use client";

import { twJoin } from "tailwind-merge";

import { ChevronLeftIcon } from "#/icons/chevronLeftIcon";
import { ChevronRightIcon } from "#/icons/chevronRightIcon";

interface NavArrowButtonProps {
	direction: "prev" | "next";
	onClick: () => void;
	disabled: boolean;
}

export const NavArrowButton = ({
	direction,
	onClick,
	disabled,
}: NavArrowButtonProps) => {
	const isPrev = direction === "prev";
	const Icon = isPrev ? ChevronLeftIcon : ChevronRightIcon;
	const label = isPrev ? "이전 페이지" : "다음 페이지";

	return (
		<button
			type="button"
			onClick={onClick}
			disabled={disabled}
			aria-label={label}
			tabIndex={disabled ? -1 : 0}
			className={twJoin(
				// 위치: 부모 컨테이너의 좌/우 끝에 두고 자기 너비의 절반만큼 바깥으로
				// 이동시켜 컨테이너 boundary 에 화살표 중심을 정렬한다.
				"ygi:absolute ygi:top-1/2 ygi:z-10 ygi:-translate-y-1/2",
				isPrev
					? "ygi:left-0 ygi:-translate-x-1/2"
					: "ygi:right-0 ygi:translate-x-1/2",
				// 외형
				"ygi:flex ygi:h-8 ygi:w-8 ygi:items-center ygi:justify-center",
				"ygi:rounded-full ygi:bg-surface-white ygi:shadow-drop",
				"ygi:cursor-pointer ygi:border-none",
				// 터치 환경에서 항상 숨김
				"ygi:pointer-coarse:hidden",
				// 기본 비표시, hover/focus 시 노출
				"ygi:opacity-0 ygi:transition-opacity",
				"ygi:group-hover/carousel:opacity-100",
				"ygi:focus-visible:opacity-100",
				// disabled
				disabled && "ygi:cursor-default ygi:opacity-30!",
			)}
		>
			<Icon size={20} />
		</button>
	);
};
