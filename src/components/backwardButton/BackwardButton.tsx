import type { ComponentProps } from "react";
import { twJoin } from "tailwind-merge";
import { ArrowLeftIcon } from "#/icons/arrowLeftIcon";

export type BackwardButtonProps = Omit<
	ComponentProps<"button">,
	"children" | "className" | "aria-label" | "type"
>;

export const BackwardButton = (props: BackwardButtonProps) => {
	return (
		<button
			type="button"
			aria-label="뒤로 가기"
			className={twJoin(
				"ygi:flex ygi:items-center ygi:justify-center",
				"ygi:h-12 ygi:w-12 ygi:p-3",
				"ygi:cursor-pointer ygi:bg-transparent",
			)}
			{...props}
		>
			<ArrowLeftIcon size={24} className="ygi:text-icon-default" />
		</button>
	);
};
