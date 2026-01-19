import { cva, type VariantProps } from 'class-variance-authority';
import {
	type ComponentProps,
	type MouseEvent,
	type ReactNode,
	useRef,
} from 'react';
import { twJoin } from 'tailwind-merge';

const inputContainerVariants = cva(
	[
		'ygi:flex ygi:w-full ygi:items-center ygi:gap-sm',
		'ygi:px-md ygi:py-sm',
		'ygi:rounded-sm ygi:border ygi:border-solid',
		'ygi:transition-colors',
	],
	{
		variants: {
			isError: {
				false: [
					'ygi:bg-palette-common-white ygi:border-palette-gray-200',
					'ygi:focus-within:bg-palette-gray-50 ygi:focus-within:border-palette-gray-800',
				],
				true: ['ygi:bg-palette-common-white ygi:border-palette-primary-500'],
			},
			disabled: {
				true: [
					'ygi:bg-palette-gray-100 ygi:border-palette-gray-200',
					'ygi:cursor-not-allowed',
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
	'ygi:flex-1 ygi:min-w-0',
	'ygi:bg-transparent ygi:outline-none',
	'ygi:body-16-md ygi:text-palette-gray-900',
	'ygi:placeholder:text-palette-gray-400',
	'ygi:disabled:text-palette-gray-400 ygi:disabled:cursor-not-allowed',
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
				'ygi:flex ygi:items-center ygi:justify-center',
				'ygi:size-5 ygi:rounded-full',
				'ygi:bg-palette-gray-100',
				'ygi:cursor-pointer',
				'ygi:transition-colors ygi:hover:bg-palette-gray-200',
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

export type InputProps = Omit<ComponentProps<'input'>, 'size'> &
	VariantProps<typeof inputContainerVariants> & {
		leftSlot?: ReactNode;
		rightSlot?: ReactNode;
		onClear?: () => void;
		showClearButton?: boolean;
	};

export const Input = ({
	leftSlot,
	rightSlot,
	onClear,
	showClearButton = false,
	isError = false,
	disabled = false,
	className,
	ref,
	...props
}: InputProps) => {
	const internalRef = useRef<HTMLInputElement>(null);
	const inputRef = (ref as React.RefObject<HTMLInputElement>) ?? internalRef;

	const handleContainerClick = () => {
		inputRef.current?.focus();
	};

	const handleClear = (e: MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();

		if (inputRef.current) {
			const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
				window.HTMLInputElement.prototype,
				'value',
			)?.set;

			if (nativeInputValueSetter) {
				nativeInputValueSetter.call(inputRef.current, '');
				inputRef.current.dispatchEvent(new Event('input', { bubbles: true }));
			}
		}

		onClear?.();
		inputRef.current?.focus();
	};

	return (
		<div
			onClick={handleContainerClick}
			className={twJoin(
				inputContainerVariants({ isError, disabled }),
				className,
			)}
		>
			{leftSlot && (
				<span className="ygi:flex ygi:items-center ygi:shrink-0">
					{leftSlot}
				</span>
			)}

			<input
				ref={inputRef}
				disabled={disabled ?? false}
				aria-invalid={isError ?? false}
				className={inputVariants()}
				{...props}
			/>

			{showClearButton && <ClearButton onClick={handleClear} />}
			{rightSlot && (
				<span className="ygi:flex ygi:items-center ygi:shrink-0">
					{rightSlot}
				</span>
			)}
		</div>
	);
};
