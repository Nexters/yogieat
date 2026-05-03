"use client";

import { type ReactNode, useMemo } from "react";

import { TabContext } from "./context";

interface RootProps {
	value: string;
	onChange: (value: string) => void;
	children: ReactNode;
}

export const Root = ({ value, onChange, children }: RootProps) => {
	const ctx = useMemo(() => ({ value, onChange }), [value, onChange]);

	return (
		<TabContext value={ctx}>
			<div role="tablist" className="ygi:flex ygi:items-center ygi:px-4">
				{children}
			</div>
		</TabContext>
	);
};
