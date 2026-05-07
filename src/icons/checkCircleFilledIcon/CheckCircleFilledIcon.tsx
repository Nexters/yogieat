import { IconBase, type IconBaseProps } from "../iconBase";

export type CheckCircleFilledIconProps = Omit<IconBaseProps, "children">;

export const CheckCircleFilledIcon = ({
	size = 16,
	...props
}: CheckCircleFilledIconProps) => {
	return (
		<IconBase size={size} viewBox="0 0 16 16" {...props}>
			<circle cx="8" cy="8" r="8" fill="currentColor" stroke="none" />
			<path
				d="M5 8.5L7 10.5L11 6"
				stroke="white"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</IconBase>
	);
};
