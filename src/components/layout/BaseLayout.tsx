export const BaseLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="ygi:relative ygi:max-w-root-layout ygi:w-full ygi:mx-auto ygi:min-h-screen-dynamic">
      {children}
    </div>
  );
};