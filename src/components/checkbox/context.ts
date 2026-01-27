"use client";

import { createContext, useContext } from "react";

interface CheckBoxContextValue {
	checked: boolean;
	disabled: boolean;
}

export const CheckBoxContext = createContext<CheckBoxContextValue | null>(null);

export const useCheckBoxContext = () => {
	const context = useContext(CheckBoxContext);
	if (!context) {
		throw new Error(
			"CheckBox components must be used within CheckBox.Root",
		);
	}
	return context;
};
