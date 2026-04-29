import * as RadixDialog from "@radix-ui/react-dialog";
import type { ReactNode } from "react";

interface TriggerProps {
	children: ReactNode;
	asChild?: boolean;
}

export const Trigger = ({ children, asChild = true }: TriggerProps) => {
	return (
		<RadixDialog.Trigger asChild={asChild}>{children}</RadixDialog.Trigger>
	);
};
