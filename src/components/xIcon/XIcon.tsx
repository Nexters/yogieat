import { IconBase, type IconBaseProps } from "../iconBase";

export type XIconProps = Omit<IconBaseProps, "children">;

export const XIcon = ({ size = 16, ...props }: XIconProps) => {
	return (
		<IconBase size={size} viewBox="0 0 20 20" {...props}>
			<path
				d="M15.8332 4.16675L4.1665 15.8334M15.8332 15.8334L4.1665 4.16675"
				strokeWidth="1.66667"
				strokeLinecap="round"
			/>
		</IconBase>
	);
};
