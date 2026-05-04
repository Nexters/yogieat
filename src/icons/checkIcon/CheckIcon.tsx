import { IconBase, type IconBaseProps } from "../iconBase";

export const CheckIcon = (props: IconBaseProps) => {
	return (
		<IconBase viewBox="0 0 24 24" {...props}>
			<path
				d="M5 12.5 10 17.5 19 7.5"
				strokeWidth="1.8"
				strokeLinecap="round"
				strokeLinejoin="round"
				fill="none"
			/>
		</IconBase>
	);
};
