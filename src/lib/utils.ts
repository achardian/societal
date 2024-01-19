import { type ClassValue, clsx } from "clsx";
import { format, formatDistance } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const convertDate = (date: Date) => {
  const distance = formatDistance(new Date(date), new Date(), {
    addSuffix: true,
  });
  const dateTime = format(new Date(date), "PP");
  return distance.includes("days ago") ? dateTime : distance;
};
