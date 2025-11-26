import { format, formatDistanceToNow } from "date-fns";
import type { DateTimeFormat } from "@/types/common";

export type { DateTimeFormat };

export function formatDateTime(
    date: Date | string,
    formatType: DateTimeFormat = "relative",
): string {
    const dateObj = typeof date === "string" ? new Date(date) : date;

    switch (formatType) {
        case "relative":
            return formatDistanceToNow(dateObj, { addSuffix: true });
        case "absolute":
            return format(dateObj, "MMM d, yyyy h:mm a");
        case "iso":
            return dateObj.toISOString();
        default:
            return formatDistanceToNow(dateObj, { addSuffix: true });
    }
}
