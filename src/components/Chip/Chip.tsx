import { cva, type VariantProps } from "class-variance-authority";
import { ComponentPropsWithoutRef, forwardRef } from "react";

const chipVariants = cva(
  [
    "ygi:inline-flex",
    "ygi:items-center",
    "ygi:justify-center",
    "ygi:px-md",
    "ygi:py-xs",
    "ygi:rounded-xl",
    "ygi:body-16-bd",
    "ygi:text-center",
    "ygi:whitespace-nowrap",
    "ygi:transition-colors",
  ],
  {
    variants: {
      selected: {
        false: [
          "ygi:bg-palette-gray-100",
          "ygi:text-palette-gray-500",
          "hover:ygi:bg-palette-gray-200",
          "hover:ygi:text-palette-gray-600",
          "disabled:ygi:text-palette-gray-400",
          "disabled:ygi:bg-palette-gray-100",
        ],
        true: [
          "ygi:bg-palette-primary-500",
          "ygi:text-palette-common-white",
          "hover:ygi:bg-palette-primary-700",
          "disabled:ygi:bg-palette-primary-200",
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
  ({ selected, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={chipVariants({ selected })}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Chip.displayName = "Chip";
