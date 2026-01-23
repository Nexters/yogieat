import { twJoin } from "tailwind-merge";

import { HelperText, type HelperTextProps } from "./HelperText";
import { Input, type InputProps } from "./Input";

export type InputFieldProps = InputProps &
	HelperTextProps & {
		containerClassName?: string;
	};

export const InputField = ({
	helperText,
	errorText,
	containerClassName,
	isError,
	...inputProps
}: InputFieldProps) => {
	const hasError = isError || !!errorText;

	return (
		<div
			className={twJoin(
				"ygi:flex ygi:flex-col ygi:gap-xs",
				containerClassName,
			)}
		>
			<Input {...inputProps} isError={hasError} />
			<HelperText helperText={helperText} errorText={errorText} />
		</div>
	);
};
