"use client";

import {
	Toaster as SonnerToaster,
	type ToasterProps as SonnerToasterProps,
} from "sonner";

export type ToasterProps = Pick<
	SonnerToasterProps,
	"offset" | "mobileOffset" | "gap" | "toastOptions"
>;

export const Toaster = ({ offset, mobileOffset, gap, toastOptions = { duration: 3000 } }: ToasterProps) => {
	return (
		<SonnerToaster
			position="bottom-center"
			offset={offset}
			mobileOffset={mobileOffset}
			gap={gap}
			toastOptions={toastOptions}
		/>
	);
};
