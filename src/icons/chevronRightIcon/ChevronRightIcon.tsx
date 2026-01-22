import { IconBase, type IconBaseProps } from "../iconBase";

export type ChevronRightIconProps = Omit<IconBaseProps, "children">;

export const ChevronRightIcon = ({
	size = 16,
	...props
}: ChevronRightIconProps) => {
	return (
		<IconBase size={size} viewBox="0 0 24 24" {...props}>
			<path
				d="M9.5999 7.19995L14.3999 12L9.5999 16.8"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</IconBase>
	);
};
