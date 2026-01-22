import type { SVGProps } from "react";

export interface ArrowLeftIconProps extends Omit<
	SVGProps<SVGSVGElement>,
	"children"
> {
	size?: number | string;
	color?: string;
}

export const ArrowLeftIcon = ({
	size = 16,
	color = "currentColor",
	...props
}: ArrowLeftIconProps) => {
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path
				d="M10.8333 18L5 12M5 12L10.8333 6M5 12H19"
				stroke={color}
				strokeWidth="1.6"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};
