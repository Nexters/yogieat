import { IconBase, IconBaseProps } from '../IconBase';

export type CircleIconProps = Omit<IconBaseProps, 'children'>;

export const CircleIcon = ({ size = 16, ...props }: CircleIconProps) => {
	return (
		<IconBase size={size} viewBox="0 0 20 20" {...props}>
			<path
				d="M18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10Z"
				strokeWidth="1.66667"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</IconBase>
	);
};
