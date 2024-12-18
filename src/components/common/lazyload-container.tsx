import { ReactNode, Suspense } from "react";

const LazyLoadContainer = ({ children }: { children: ReactNode }) => {
  return (
    <Suspense
      fallback={
        <div className="h-screen bg-main-blue-t9 flex items-center justify-center text-main-blue">
          Loading
        </div>
      }
    >
      {children}
    </Suspense>
  );
};

export default LazyLoadContainer;
