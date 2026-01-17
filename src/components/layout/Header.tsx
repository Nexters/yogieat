import type { ReactNode } from "react";

interface HeaderProps {
  children: ReactNode;
}

export const Header = ({ children }: HeaderProps) => {
  return (
    <header className="ygi:fixed ygi:top-0 ygi:left-0 ygi:flex ygi:items-center ygi:justify-center ygi:w-full ygi:h-layout-header-height" style={{
        zIndex: 9
    }}>
      <div className="ygi:max-w-root-layout ygi:w-full ygi:h-layout-header-height">
        {children}
      </div>
    </header>
  );
};