import type { SVGProps } from "react";

export interface HomeIconProps extends Omit<
	SVGProps<SVGSVGElement>,
	"children"
> {
	size?: number | string;
	color?: string;
}

export const HomeIcon = ({
	size = 24,
	color = "currentColor",
	...props
}: HomeIconProps) => {
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
				d="M8.7999 21.6V14.2964C8.7999 13.6241 9.37298 13.0791 10.0799 13.0791H13.9199C14.6268 13.0791 15.1999 13.6241 15.1999 14.2964V21.6M11.2581 2.62527L2.93811 8.25179C2.60045 8.48014 2.3999 8.84979 2.3999 9.24381V19.7741C2.3999 20.7825 3.25952 21.6 4.3199 21.6H19.6799C20.7403 21.6 21.5999 20.7825 21.5999 19.7741V9.24381C21.5999 8.84979 21.3994 8.48014 21.0617 8.25179L12.7417 2.62527C12.2976 2.32494 11.7022 2.32494 11.2581 2.62527Z"
				stroke={color}
				strokeWidth="1.6"
				strokeLinecap="round"
			/>
		</svg>
	);
};
