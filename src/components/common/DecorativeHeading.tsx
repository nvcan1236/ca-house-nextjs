import { ReactNode } from "react";
import H3 from "./H3";

const DecorativeHeading = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <H3 className={`relative mt-2 mb-1 text-main-blue-s3 ${className}`}>
      <p className="relative z-10">{children}</p>
      <div className="absolute top-full -mt-1 -left-0.5 -right-4 from-main-yellow to-transparent opacity-75 h-[6px] z-0 bg-gradient-to-r  "></div>
    </H3>
  );
};

export default DecorativeHeading;
