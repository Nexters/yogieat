import { IconBase, type IconBaseProps } from "../iconBase";

export const MapPinIcon = (props: IconBaseProps) => {
	return (
		<IconBase {...props}>
			<path
				d="M12 21s7-7.5 7-12a7 7 0 1 0-14 0c0 4.5 7 12 7 12Z"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<circle cx="12" cy="9" r="2.5" strokeWidth="1.5" />
		</IconBase>
	);
};
