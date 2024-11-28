import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function twc(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
