import { useInView } from "motion/react";
import { useRef } from "react";

export const useScrollReveal = () => {
	const ref = useRef<HTMLElement>(null);
	const isInView = useInView(ref, { once: true, amount: 0.2 });
	return { ref, isInView };
};
