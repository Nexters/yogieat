"use client";

import { twJoin } from "tailwind-merge";

import { ArrowLeftIcon } from "#/icons/arrowLeftIcon";

interface ToastLinkButtonProps {
	label: string;
	onClick: () => void;
}

export const ToastLinkButton = ({ label, onClick }: ToastLinkButtonProps) => {
	return (
		<button
			type="button"
			className={twJoin(
				"ygi:ml-auto ygi:flex ygi:items-center ygi:justify-center ygi:gap-0.5",
				"ygi:cursor-pointer ygi:body-14-sb ygi:text-palette-primary-500",
				"ygi:text-nowrap"
			)}
			onClick={onClick}
		>
			{label}
			<ArrowLeftIcon
				size={20}
				className="ygi:rotate-180 ygi:text-palette-primary-500"
			/>
		</button>
	);
};
