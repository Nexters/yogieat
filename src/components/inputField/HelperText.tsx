import { cva } from 'class-variance-authority';

const helperTextVariants = cva(['ygi:body-14-rg'], {
	variants: {
		isError: {
			false: 'ygi:text-palette-gray-400',
			true: 'ygi:text-palette-primary-500',
		},
	},
	defaultVariants: {
		isError: false,
	},
});

export type HelperTextProps = {
	helperText?: string;
	errorText?: string;
	className?: string;
};

export const HelperText = ({
	helperText,
	errorText,
	className,
}: HelperTextProps) => {
	const displayText = errorText ?? helperText;
	const isError = !!errorText;

	if (!displayText) {
		return null;
	}

	return (
		<p className={helperTextVariants({ isError, className })}>{displayText}</p>
	);
};
