"use client";

import * as RadixDialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "motion/react";
import type { ReactNode } from "react";
import { twJoin } from "tailwind-merge";

interface ContentProps {
	children: ReactNode;
	open?: boolean;
	title?: string;
	description?: string;
}

export const Content = ({
	children,
	open,
	title = "Dialog",
	description = "Dialog Description",
}: ContentProps) => {
	return (
		<AnimatePresence>
			{open && (
				<RadixDialog.Portal forceMount>
					<RadixDialog.Overlay asChild forceMount>
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ type: "tween", duration: 0.2, ease: "easeInOut" }}
							className="ygi:fixed ygi:inset-0 ygi:z-50 ygi:bg-bg-dim"
						/>
					</RadixDialog.Overlay>
					<RadixDialog.Content asChild forceMount>
						<motion.div
							initial={{ opacity: 0, scale: 0.95 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.95 }}
							transition={{ type: "tween", duration: 0.2, ease: "easeInOut" }}
							className={twJoin(
								"ygi:fixed ygi:left-1/2 ygi:top-1/2 ygi:-translate-x-1/2 ygi:-translate-y-1/2",
								"ygi:z-50 ygi:w-[327px]",
								"ygi:rounded-[20px] ygi:bg-bg-white ygi:p-6",
								"focus:ygi:outline-none",
							)}
						>
							<RadixDialog.Title className="ygi:sr-only">
								{title}
							</RadixDialog.Title>
							<RadixDialog.Description className="ygi:sr-only">
								{description}
							</RadixDialog.Description>
							{children}
						</motion.div>
					</RadixDialog.Content>
				</RadixDialog.Portal>
			)}
		</AnimatePresence>
	);
};
