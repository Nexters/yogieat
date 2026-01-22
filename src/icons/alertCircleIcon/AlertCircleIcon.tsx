import { IconBase, type IconBaseProps } from "../iconBase";

export type AlertCircleIconProps = Omit<IconBaseProps, "children">;

export const AlertCircleIcon = ({
	size = 20,
	...props
}: AlertCircleIconProps) => {
	return (
		<IconBase size={size} viewBox="-1 -1 20 20" {...props}>
			<path
				d="M0 9C0 4.02944 4.02944 0 9 0C13.9706 0 18 4.02944 18 9C18 13.9706 13.9706 18 9 18C4.02944 18 0 13.9706 0 9Z"
				fill="currentColor"
			/>
			<path
				d="M9 5V9"
				stroke="#E5E7EB"
				strokeWidth="2"
				strokeLinecap="round"
			/>
			<circle cx="9" cy="13" r="1.5" fill="#E5E7EB" />
		</IconBase>
	);
};
