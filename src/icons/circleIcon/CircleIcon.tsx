import { IconBase, type IconBaseProps } from "../iconBase";

export type CircleIconProps = Omit<IconBaseProps, "children">;

export const CircleIcon = ({ size = 16, ...props }: CircleIconProps) => {
	return (
		<IconBase size={size} viewBox="0 0 12 12" {...props}>
			<path
				d="M10.0012 5.55798C10.0017 8.01258 8.01228 10.0019 5.55768 10.0013C3.10309 10.0007 1.11281 8.01038 1.11229 5.55578C1.11176 3.10117 3.10117 1.11182 5.55577 1.11243C8.01037 1.11304 10.0006 3.10338 10.0012 5.55798Z"
				strokeWidth="1.66667"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</IconBase>
	);
};
