import { useEffect } from "react";

function useScrollLock(show: boolean): void {
  useEffect(() => {
    const originalStyle: string = window.getComputedStyle(
      document.body
    ).overflow;
    document.body.style.overflow = show ? "auto" : "hidden";
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [show]);
}

export default useScrollLock;
