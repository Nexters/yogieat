import type { SVGProps, ReactNode } from 'react';

export interface IconBaseProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
  color?: string;
  children?: ReactNode;
}

export const IconBase = ({
  size = 16,
  color = "currentColor",
  children,
  ...props
}: IconBaseProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke={color}
      {...props}
    >
      {children}
    </svg>
  );
};
