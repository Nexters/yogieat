import type { ComponentPropsWithoutRef } from "react";
import { twJoin } from "tailwind-merge";

export type RootProps = Omit<ComponentPropsWithoutRef<"div">, "className">;

export const Root = ({ children, ...props }: RootProps) => {
	return (
		<section
			className={twJoin(
				"ygi:flex ygi:flex-col ygi:items-start ygi:gap-3",
				"ygi:w-full",
			)}
			{...props}
		>
			{children}
		</section>
	);
};
