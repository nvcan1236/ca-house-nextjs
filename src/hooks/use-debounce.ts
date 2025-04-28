import { useEffect } from "react"

export const useDebouce = (
  cb: () => void,
  deps: string[],
  timeout: number = 300
) => {
  useEffect(() => {
    const timer = setTimeout(cb, timeout)
    return () => clearTimeout(timer)
  }, [cb, timeout])
}
