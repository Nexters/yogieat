import * as RadixDialog from "@radix-ui/react-dialog";
import type { ComponentProps, ReactNode } from "react";
import { twJoin, twMerge } from "tailwind-merge";

interface DialogRootProps {
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
	children: ReactNode;
}

const DialogRoot = ({ open, onOpenChange, children }: DialogRootProps) => {
	return (
		<RadixDialog.Root open={open} onOpenChange={onOpenChange}>
			{children}
		</RadixDialog.Root>
	);
};

interface DialogTriggerProps {
	children: ReactNode;
	asChild?: boolean;
}

const DialogTrigger = ({ children, asChild = true }: DialogTriggerProps) => {
	return (
		<RadixDialog.Trigger asChild={asChild}>{children}</RadixDialog.Trigger>
	);
};

interface DialogContentProps extends ComponentProps<"div"> {
	children: ReactNode;
}

const DialogContent = ({
	children,
	className,
	...props
}: DialogContentProps) => {
	return (
		<RadixDialog.Portal>
			<RadixDialog.Overlay
				className={twJoin(
					"ygi:fixed ygi:inset-0 ygi:z-50",
					"ygi:bg-black/50",
					"data-[state=open]:ygi:animate-in data-[state=closed]:ygi:animate-out",
					"data-[state=closed]:ygi:fade-out-0 data-[state=open]:ygi:fade-in-0",
				)}
			/>
			<RadixDialog.Content
				className={twMerge(
					twJoin(
						"ygi:fixed ygi:top-1/2 ygi:left-1/2 ygi:z-50",
						"ygi:-translate-x-1/2 ygi:-translate-y-1/2",
						"ygi:w-full ygi:max-w-[calc(100%-48px)]",
						"ygi:rounded-[20px] ygi:bg-white ygi:shadow-lg",
						"data-[state=open]:ygi:animate-in data-[state=closed]:ygi:animate-out",
						"data-[state=closed]:ygi:fade-out-0 data-[state=open]:ygi:fade-in-0",
						"data-[state=closed]:ygi:zoom-out-95 data-[state=open]:ygi:zoom-in-95",
					),
					className,
				)}
				{...props}
			>
				{children}
			</RadixDialog.Content>
		</RadixDialog.Portal>
	);
};

const DialogClose = RadixDialog.Close;

export const Dialog = Object.assign(DialogRoot, {
	Trigger: DialogTrigger,
	Content: DialogContent,
	Close: DialogClose,
});
