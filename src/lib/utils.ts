import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("vi", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

export const formatDateTime = (date: string) =>
  new Date(date).toLocaleDateString("vi", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "numeric",
    minute: "numeric",
  });