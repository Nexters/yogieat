import { twMerge } from "tailwind-merge";

import { ChevronRightIcon } from "#/icons/chevronRightIcon";

interface ChevronProps {
	className?: string;
}

export const Chevron = ({ className }: ChevronProps) => {
	return (
		<ChevronRightIcon
			size={20}
			className={twMerge(
				"ygi:shrink-0 ygi:text-palette-secondary-700",
				className,
			)}
		/>
	);
};
