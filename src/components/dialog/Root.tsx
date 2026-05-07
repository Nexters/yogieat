"use client";

import * as RadixDialog from "@radix-ui/react-dialog";
import type { ReactNode } from "react";

interface RootProps {
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
	children: ReactNode;
}

export const Root = ({ open, onOpenChange, children }: RootProps) => {
	return (
		<RadixDialog.Root open={open} onOpenChange={onOpenChange}>
			{children}
		</RadixDialog.Root>
	);
};
