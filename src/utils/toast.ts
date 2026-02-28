import {
	toast as sonnerToast,
	type ExternalToast as SonnerToastOptions,
} from "sonner";
import { AlertCircleIcon } from "#/icons/alertCircleIcon";

type ToastOptions = Omit<SonnerToastOptions, "icon" | "classNames">;

export const toast = {
	success: (message: string, options?: ToastOptions) => {
		sonnerToast(message, {
			classNames: {
				toast: "ygi:bg-button-primary! ygi:text-text-inverse! ygi:break-keep! ygi:body-14-md! ygi:rounded-sm! ygi:py-3! ygi:px-5! ygi:flex! ygi:items-center! ygi:justify-center! ygi:border-none!",
			},
			duration: options?.duration,
			...options,
		});
	},
	warning: (message: string, options?: ToastOptions) => {
		sonnerToast(message, {
			icon: AlertCircleIcon({
				size: 20,
				className: "ygi:text-palette-primary-500 ygi:mx-auto!",
			}),
			classNames: {
				toast: "ygi:bg-button-primary! ygi:break-keep! ygi:text-text-inverse! ygi:body-14-md! ygi:rounded-sm! ygi:py-3! ygi:pl-4! ygi:pr-5! ygi:gap-2! ygi:flex! ygi:items-center! ygi:border-none!",
			},
			duration: options?.duration,
			...options,
		});
	},
};
