import { IconBase, type IconBaseProps } from "../iconBase";

export type ChevronRightIconProps = Omit<IconBaseProps, "children">;

export const ChevronLeftIcon = ({
	size = 16,
	...props
}: ChevronRightIconProps) => {
	return (
		<IconBase size={size} viewBox="0 0 16 16" {...props}>
			<path
				d="M9.5999 11.2L6.3999 8L9.5999 4.8"
				strokeWidth="1.6"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</IconBase>
	);
};
