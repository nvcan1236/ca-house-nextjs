import { ReactNode } from "react";

const Item = ({children, className}: {
  children: ReactNode,
  className?: string
}) => {
  return (
    <div className={`flex justify-between items-center ${className}`}>
      {children}
    </div>
  );
};

export default Item;