"use client";

import { createContext, use } from "react";

interface TabContextValue {
	value: string;
	onChange: (value: string) => void;
}

export const TabContext = createContext<TabContextValue | null>(null);

export const useTabContext = () => {
	const ctx = use(TabContext);
	if (!ctx) {
		throw new Error("Tab.Item must be used inside Tab.Root");
	}
	return ctx;
};
