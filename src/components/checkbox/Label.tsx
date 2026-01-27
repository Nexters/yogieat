"use client";

import { cva } from "class-variance-authority";
import type { ReactNode } from "react";
import { useCheckBoxContext } from "./context";

const labelVariants = cva(["ygi:body-14-md"], {
	variants: {
		checked: {
			false: "ygi:text-text-secondary",
			true: "ygi:text-text-primary",
		},
	},
	defaultVariants: {
		checked: false,
	},
});

interface LabelProps {
	children: ReactNode;
}

export const Label = ({ children }: LabelProps) => {
	const { checked } = useCheckBoxContext();

	return <span className={labelVariants({ checked })}>{children}</span>;
};
