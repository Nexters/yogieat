import { cva, type VariantProps } from "class-variance-authority";
import {
	type ChangeEvent,
	type ComponentProps,
	type MouseEvent,
	type ReactNode,
	useRef,
	useState,
} from "react";
import { twJoin } from "tailwind-merge";

const inputContainerVariants = cva(
	[
		"ygi:flex ygi:w-full ygi:items-center ygi:gap-sm",
		"ygi:px-md ygi:py-sm",
		"ygi:rounded-sm ygi:border ygi:border-solid",
		"ygi:transition-colors",
	],
	{
		variants: {
			isError: {
				false: [
					"ygi:border-palette-gray-200 ygi:bg-palette-common-white",
					"ygi:focus-within:border-palette-gray-800 ygi:focus-within:bg-palette-gray-50",
				],
				true: [
					"ygi:border-palette-primary-500 ygi:bg-palette-common-white",
				],
			},
			disabled: {
				true: [
					"ygi:border-palette-gray-200 ygi:bg-palette-gray-100",
					"ygi:cursor-not-allowed",
				],
				false: [],
			},
		},
		defaultVariants: {
			isError: false,
			disabled: false,
		},
	},
);

const inputVariants = cva([
	"ygi:min-w-0 ygi:flex-1",
	"ygi:bg-transparent ygi:outline-none",
	"ygi:body-16-md ygi:text-palette-gray-900",
	"ygi:placeholder:text-palette-gray-400",
	"ygi:disabled:cursor-not-allowed ygi:disabled:text-palette-gray-400",
]);

type ClearButtonProps = {
	onClick: (e: MouseEvent<HTMLButtonElement>) => void;
};

const ClearButton = ({ onClick }: ClearButtonProps) => {
	return (
		<button
			type="button"
			onClick={onClick}
			className={twJoin(
				"ygi:flex ygi:items-center ygi:justify-center",
				"ygi:size-5 ygi:rounded-full",
				"ygi:bg-palette-gray-100",
				"ygi:cursor-pointer",
				"ygi:transition-colors ygi:hover:bg-palette-gray-200",
			)}
			aria-label="입력 지우기"
		>
			<svg
				width="9"
				height="9"
				viewBox="0 0 9 9"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				aria-hidden="true"
			>
				<path
					d="M1 1L8 8M8 1L1 8"
					stroke="#6B7280"
					strokeWidth="1.5"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		</button>
	);
};

export type InputProps = Omit<ComponentProps<"input">, "size"> &
	VariantProps<typeof inputContainerVariants> & {
		leftSlot?: ReactNode;
		rightSlot?: ReactNode;
		onClear?: () => void;
		showClearButton?: boolean;
		inputClassName?: string;
	};

export const Input = ({
	leftSlot,
	rightSlot,
	onClear,
	showClearButton = false,
	isError = false,
	disabled = false,
	className,
	inputClassName,
	ref,
	value,
	defaultValue,
	onChange,
	...props
}: InputProps) => {
	const internalRef = useRef<HTMLInputElement>(null);
	const inputRef = (ref as React.RefObject<HTMLInputElement>) ?? internalRef;

	const isControlled = value !== undefined;
	const [internalValue, setInternalValue] = useState(defaultValue ?? "");

	const currentValue = isControlled ? value : internalValue;
	const hasValue = String(currentValue).length > 0;

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (!isControlled) {
			setInternalValue(e.target.value);
		}
		onChange?.(e);
	};

	const handleContainerClick = () => {
		inputRef.current?.focus();
	};

	const handleClear = (e: MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();

		if (!isControlled) {
			setInternalValue("");
		}

		if (inputRef.current) {
			const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
				window.HTMLInputElement.prototype,
				"value",
			)?.set;

			if (nativeInputValueSetter) {
				nativeInputValueSetter.call(inputRef.current, "");
				inputRef.current.dispatchEvent(
					new Event("input", { bubbles: true }),
				);
			}
		}

		onClear?.();
		inputRef.current?.focus();
	};

	const shouldShowClearButton = showClearButton && hasValue && !disabled;

	return (
		<div
			onClick={handleContainerClick}
			className={twJoin(
				inputContainerVariants({ isError, disabled }),
				className,
			)}
		>
			{leftSlot && (
				<span className="ygi:flex ygi:shrink-0 ygi:items-center">
					{leftSlot}
				</span>
			)}

			<input
				ref={inputRef}
				disabled={disabled ?? false}
				aria-invalid={isError ?? false}
				className={twJoin(inputVariants(), inputClassName)}
				value={isControlled ? value : undefined}
				defaultValue={isControlled ? undefined : defaultValue}
				onChange={handleChange}
				{...props}
			/>

			{shouldShowClearButton && <ClearButton onClick={handleClear} />}
			{rightSlot && (
				<span className="ygi:flex ygi:shrink-0 ygi:items-center">
					{rightSlot}
				</span>
			)}
		</div>
	);
};
