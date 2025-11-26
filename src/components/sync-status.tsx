"use client";

import { formatDistanceToNow } from "date-fns";
import { AlertCircle, CheckCircle2, Clock, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

interface SyncStatusProps {
    lastSyncTime: Date | null;
    nextSyncTime: Date | null;
    isAutoSyncing: boolean;
    lastSyncResult: {
        success: boolean;
        newRecordings?: number;
        error?: string;
    } | null;
    className?: string;
}

export function SyncStatus({
    lastSyncTime,
    nextSyncTime,
    isAutoSyncing,
    lastSyncResult,
    className,
}: SyncStatusProps) {
    const getStatusIcon = () => {
        if (isAutoSyncing) {
            return <RefreshCw className="w-3 h-3 text-primary animate-spin" />;
        }

        if (lastSyncResult?.success) {
            return <CheckCircle2 className="w-3 h-3 text-accent-green" />;
        }

        if (lastSyncResult?.success === false) {
            return <AlertCircle className="w-3 h-3 text-destructive" />;
        }

        return <Clock className="w-3 h-3 text-muted-foreground" />;
    };

    const getStatusText = () => {
        if (isAutoSyncing) {
            return "Syncing...";
        }

        if (lastSyncResult?.success === false) {
            return "Sync failed";
        }

        if (lastSyncTime) {
            try {
                return `Synced ${formatDistanceToNow(lastSyncTime, {
                    addSuffix: true,
                })}`;
            } catch {
                return "Synced recently";
            }
        }

        return "Never synced";
    };

    const getNextSyncText = () => {
        if (isAutoSyncing || !nextSyncTime) {
            return null;
        }

        try {
            const now = new Date();
            const diff = nextSyncTime.getTime() - now.getTime();

            if (diff < 60000) {
                return "Next sync soon";
            }

            return `Next sync ${formatDistanceToNow(nextSyncTime, {
                addSuffix: true,
            })}`;
        } catch {
            return null;
        }
    };

    const nextSyncText = getNextSyncText();

    return (
        <div
            className={cn(
                "flex items-center gap-2 text-xs text-muted-foreground",
                className,
            )}
        >
            {getStatusIcon()}
            <div className="flex flex-col">
                <span className="font-medium">{getStatusText()}</span>
                {nextSyncText && (
                    <span className="text-[10px] opacity-70">
                        {nextSyncText}
                    </span>
                )}
                {lastSyncResult?.success &&
                    lastSyncResult.newRecordings !== undefined &&
                    lastSyncResult.newRecordings > 0 && (
                        <span className="text-[10px] text-primary">
                            {lastSyncResult.newRecordings} new recording
                            {lastSyncResult.newRecordings !== 1 ? "s" : ""}
                        </span>
                    )}
                {lastSyncResult?.error && (
                    <span className="text-[10px] text-destructive">
                        {lastSyncResult.error}
                    </span>
                )}
            </div>
        </div>
    );
}
