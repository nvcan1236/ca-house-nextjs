import { cn } from "@/lib/utils";
import { ReactNode } from "react";

const H3 = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return (
    <h3
      className={cn("text-lg text-main-blue-s3 font-medium w-fit", className)}
    >
      {children}
    </h3>
  );
};

export default H3;
