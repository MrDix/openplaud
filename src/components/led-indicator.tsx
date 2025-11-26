import { cn } from "@/lib/utils";

interface LEDIndicatorProps {
    active?: boolean;
    status?: "active" | "warning" | "error";
    size?: "sm" | "md" | "lg";
    pulse?: boolean;
    className?: string;
}

const sizeMap = {
    sm: "w-2 h-2",
    md: "w-3 h-3",
    lg: "w-4 h-4",
};

export function LEDIndicator({
    active = false,
    status = "active",
    size = "md",
    pulse = false,
    className,
}: LEDIndicatorProps) {
    const statusClass = active
        ? status === "active"
            ? "led-active"
            : status === "warning"
              ? "led-warning"
              : "led-error"
        : "bg-metal-dark";

    return (
        <div
            className={cn(
                "led-indicator",
                sizeMap[size],
                statusClass,
                pulse && active && "animate-pulse",
                className,
            )}
        />
    );
}
