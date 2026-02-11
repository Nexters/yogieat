"use client";

import * as RadixDialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "motion/react";
import type { ReactNode } from "react";
import { twJoin } from "tailwind-merge";

interface BottomSheetRootProps {
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
	children: ReactNode;
}

const BottomSheetRoot = ({
	open,
	onOpenChange,
	children,
}: BottomSheetRootProps) => {
	return (
		<RadixDialog.Root open={open} onOpenChange={onOpenChange}>
			{children}
		</RadixDialog.Root>
	);
};

interface BottomSheetTriggerProps {
	children: ReactNode;
	asChild?: boolean;
}

const BottomSheetTrigger = ({
	children,
	asChild = true,
}: BottomSheetTriggerProps) => {
	return (
		<RadixDialog.Trigger asChild={asChild}>{children}</RadixDialog.Trigger>
	);
};

interface BottomSheetContentProps {
	children: ReactNode;
	open?: boolean;
	title?: string;
}

const BottomSheetContent = ({
	children,
	open,
	title = "Bottom Sheet",
}: BottomSheetContentProps) => {
	return (
		<AnimatePresence>
			{open && (
				<RadixDialog.Portal forceMount>
					<RadixDialog.Overlay asChild forceMount>
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.2 }}
							className="ygi:fixed ygi:inset-0 ygi:z-50 ygi:bg-black/50"
						/>
					</RadixDialog.Overlay>
					<RadixDialog.Content asChild forceMount>
						<motion.div
							initial={{ y: "100%" }}
							animate={{ y: 0 }}
							exit={{ y: "100%" }}
							transition={{
								type: "spring",
								damping: 30,
								stiffness: 300,
							}}
							className={twJoin(
								"ygi:fixed ygi:right-0 ygi:bottom-0 ygi:left-0 ygi:z-50",
								"ygi:rounded-t-[20px] ygi:bg-white ygi:shadow-lg",
								"ygi:mx-auto ygi:w-full ygi:max-w-root-layout ygi:overflow-y-auto",
								"focus:ygi:outline-none",
							)}
						>
							<RadixDialog.Title className="ygi:sr-only">
								{title}
							</RadixDialog.Title>

							<div className="ygi:flex ygi:justify-center ygi:px-5 ygi:py-3">
								<div className="ygi:h-1 ygi:w-10 ygi:rounded-full ygi:bg-[#D1D5DB]" />
							</div>

							{children}
						</motion.div>
					</RadixDialog.Content>
				</RadixDialog.Portal>
			)}
		</AnimatePresence>
	);
};

const BottomSheetClose = RadixDialog.Close;

export const BottomSheet = Object.assign(BottomSheetRoot, {
	Trigger: BottomSheetTrigger,
	Content: BottomSheetContent,
	Close: BottomSheetClose,
});
