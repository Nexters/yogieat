import { cva, type VariantProps } from "class-variance-authority";
import { type ComponentPropsWithoutRef, forwardRef } from "react";

const chipVariants = cva(
  [
    "ygi:inline-flex ygi:items-center ygi:justify-center",
    "ygi:px-md ygi:py-xs",
    "ygi:rounded-xl ygi:transition-colors",
    "ygi:body-16-bd ygi:text-center ygi:whitespace-nowrap",
  ],
  {
    variants: {
      selected: {
        false: [
          "ygi:bg-palette-gray-100 ygi:text-palette-gray-500",
          "ygi:hover:bg-palette-gray-200 ygi:hover:text-palette-gray-600",
          "ygi:disabled:bg-palette-gray-100 ygi:disabled:text-palette-gray-400",
        ],
        true: [
          "ygi:bg-palette-primary-500 ygi:text-palette-common-white",
          "ygi:hover:bg-palette-primary-700",
          "ygi:disabled:bg-palette-primary-200",
        ],
      },
    },
    defaultVariants: {
      selected: false,
    },
  },
);

export interface ChipProps
  extends
    ComponentPropsWithoutRef<"button">,
    VariantProps<typeof chipVariants> {
  selected?: boolean;
}

export const Chip = forwardRef<HTMLButtonElement, ChipProps>(
  ({ selected, children, disabled, ...props }, ref) => (
    <button
      ref={ref}
      disabled={disabled}
      className={chipVariants({ selected })}
      {...props}
    >
      {children}
    </button>
  ),
);

Chip.displayName = "Chip";
