"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { MetalButton } from "@/components/metal-button";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

interface SpeachesModel {
    id: string;
    object?: string;
    created?: number;
    owned_by?: string;
}

interface RegistryModel {
    id: string;
    task?: string;
}

interface SpeachesModelManagerProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    baseUrl: string;
    onModelsChanged: () => void;
}

export function SpeachesModelManager({
    open,
    onOpenChange,
    baseUrl,
    onModelsChanged,
}: SpeachesModelManagerProps) {
    const [installedModels, setInstalledModels] = useState<SpeachesModel[]>([]);
    const [registryModels, setRegistryModels] = useState<RegistryModel[]>([]);
    const [isLoadingInstalled, setIsLoadingInstalled] = useState(false);
    const [isLoadingRegistry, setIsLoadingRegistry] = useState(false);
    const [installingId, setInstallingId] = useState<string | null>(null);
    const [removingId, setRemovingId] = useState<string | null>(null);

    const fetchInstalled = async () => {
        setIsLoadingInstalled(true);
        try {
            const res = await fetch(
                `/api/speaches/models?baseUrl=${encodeURIComponent(baseUrl)}`,
            );
            if (!res.ok) throw new Error("Failed to fetch");
            const data = await res.json();
            setInstalledModels(data.data || []);
        } catch {
            toast.error("Failed to load installed models");
        } finally {
            setIsLoadingInstalled(false);
        }
    };

    const fetchRegistry = async () => {
        setIsLoadingRegistry(true);
        try {
            const res = await fetch(
                `/api/speaches/registry?baseUrl=${encodeURIComponent(baseUrl)}`,
            );
            if (!res.ok) throw new Error("Failed to fetch");
            const data = await res.json();
            setRegistryModels(data.data || []);
        } catch {
            toast.error("Failed to load model registry");
        } finally {
            setIsLoadingRegistry(false);
        }
    };

    useEffect(() => {
        if (open) {
            fetchInstalled();
            fetchRegistry();
        }
        // biome-ignore lint/correctness/useExhaustiveDependencies: fetchInstalled/fetchRegistry are stable within render
    }, [open, baseUrl]);

    const handleInstall = async (modelId: string) => {
        setInstallingId(modelId);
        try {
            const res = await fetch(
                `/api/speaches/models?baseUrl=${encodeURIComponent(baseUrl)}`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ modelId }),
                },
            );
            if (!res.ok) throw new Error("Failed to install");
            toast.success(`Installing ${modelId}…`);
            await fetchInstalled();
            onModelsChanged();
        } catch {
            toast.error("Failed to install model");
        } finally {
            setInstallingId(null);
        }
    };

    const handleRemove = async (modelId: string) => {
        setRemovingId(modelId);
        try {
            const res = await fetch(
                `/api/speaches/models?baseUrl=${encodeURIComponent(baseUrl)}&modelId=${encodeURIComponent(modelId)}`,
                { method: "DELETE" },
            );
            if (!res.ok) throw new Error("Failed to remove");
            toast.success(`Removed ${modelId}`);
            await fetchInstalled();
            onModelsChanged();
        } catch {
            toast.error("Failed to remove model");
        } finally {
            setRemovingId(null);
        }
    };

    const installedIds = new Set(installedModels.map((m) => m.id));
    const availableToInstall = registryModels.filter(
        (m) => !installedIds.has(m.id),
    );

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-lg max-h-[80vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle>Manage Speaches Models</DialogTitle>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto space-y-6 py-2">
                    {/* Installed models */}
                    <div className="space-y-2">
                        <h3 className="text-sm font-medium">Installed Models</h3>
                        {isLoadingInstalled ? (
                            <p className="text-sm text-muted-foreground">
                                Loading…
                            </p>
                        ) : installedModels.length === 0 ? (
                            <p className="text-sm text-muted-foreground">
                                No models installed yet.
                            </p>
                        ) : (
                            <div className="space-y-1">
                                {installedModels.map((model) => (
                                    <div
                                        key={model.id}
                                        className="flex items-center justify-between gap-2 py-1.5 px-3 rounded-md border bg-card"
                                    >
                                        <span className="font-mono text-xs truncate">
                                            {model.id}
                                        </span>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="shrink-0 text-destructive hover:text-destructive"
                                            disabled={removingId === model.id}
                                            onClick={() =>
                                                handleRemove(model.id)
                                            }
                                        >
                                            {removingId === model.id
                                                ? "Removing…"
                                                : "Remove"}
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Available to install */}
                    <div className="space-y-2">
                        <h3 className="text-sm font-medium">
                            Available to Install
                        </h3>
                        {isLoadingRegistry ? (
                            <p className="text-sm text-muted-foreground">
                                Loading registry…
                            </p>
                        ) : availableToInstall.length === 0 ? (
                            <p className="text-sm text-muted-foreground">
                                {registryModels.length === 0
                                    ? "Registry unavailable."
                                    : "All registry models are installed."}
                            </p>
                        ) : (
                            <div className="space-y-1">
                                {availableToInstall.map((model) => (
                                    <div
                                        key={model.id}
                                        className="flex items-center justify-between gap-2 py-1.5 px-3 rounded-md border bg-card"
                                    >
                                        <span className="font-mono text-xs truncate">
                                            {model.id}
                                        </span>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            disabled={installingId === model.id}
                                            onClick={() =>
                                                handleInstall(model.id)
                                            }
                                        >
                                            {installingId === model.id
                                                ? "Installing…"
                                                : "Install"}
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="pt-2">
                    <MetalButton
                        onClick={() => onOpenChange(false)}
                        className="w-full"
                    >
                        Close
                    </MetalButton>
                </div>
            </DialogContent>
        </Dialog>
    );
}
