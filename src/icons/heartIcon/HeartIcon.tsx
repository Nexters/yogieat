import type { SVGProps } from "react";

export interface HeartIconProps extends Omit<
	SVGProps<SVGSVGElement>,
	"children"
> {
	size?: number | string;
	color?: string;
}

export const HeartIcon = ({
	size = 16,
	color = "currentColor",
	...props
}: HeartIconProps) => {
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 15 13"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path
				d="M7.83823 1.17245C9.40032 -0.390815 11.933 -0.390817 13.4951 1.17245C15.0572 2.73572 15.0572 5.27032 13.4951 6.83359C11.9331 8.39685 7.33334 12.9999 7.33334 12.9999C7.33334 12.9999 2.73365 8.39685 1.17156 6.83359C-0.390526 5.27032 -0.390515 2.73573 1.17156 1.17245C2.73366 -0.390818 5.26637 -0.390818 6.82846 1.17245L7.33334 1.67766L7.83823 1.17245Z"
				fill={color}
			/>
		</svg>
	);
};
