import { type ClassValue, clsx } from "clsx";
import { formatDistance } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const convertDate = (date: Date) => {
  return formatDistance(new Date(date), new Date(), {
    addSuffix: true,
  });
};
