import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const isBuild = process.env.NEXT_PHASE === "phase-production-build";
export const isDev = process.env.NODE_ENV === "development";

export function absoluteUrl(path: string) {
    if (typeof window !== "undefined") {
        return `${window.location.origin}${path}`;
    }
    const { env } = require("@/lib/env");
    return `${env.APP_URL}${path}`;
}
