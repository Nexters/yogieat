import type { ReactNode } from "react";

interface FooterProps {
  children: ReactNode;
}
export const Footer = ({ children }: FooterProps) => {
  return (
    <footer className="ygi:fixed ygi:bottom-0 ygi:left-0 ygi:flex ygi:items-center ygi:justify-center ygi:w-full ygi:h-layout-footer-height" style={{
      zIndex: 9
    }}>
      <div className="ygi:max-w-root-layout ygi:w-full ygi:h-layout-footer-height">
        {children}
      </div>
    </footer>
  );
};