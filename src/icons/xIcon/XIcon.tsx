import { IconBase, type IconBaseProps } from "../iconBase";

export type XIconProps = Omit<IconBaseProps, "children">;

export const XIcon = ({ size = 16, ...props }: XIconProps) => {
	return (
		<IconBase size={size} viewBox="0 0 9 9" {...props}>
			<path
				d="M7.5928 1.1127L1.11272 7.59257M7.5942 7.59418L1.11133 1.11108"
				strokeWidth="1.66667"
				strokeLinecap="round"
			/>
		</IconBase>
	);
};
