"use client";

import { useMemo } from "react";
import { Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface RelapseEntry {
  timestamp: number;
  lie?: string;
  change?: string;
}

interface TriggerEntry {
  timestamp: number;
  triggers: string[];
  actionCompleted: string;
}

type ReflectionItem =
  | ({ type: "relapse" } & RelapseEntry)
  | ({ type: "action" } & TriggerEntry);

interface ReflectionsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  relapseHistory: RelapseEntry[];
  triggerHistory: TriggerEntry[];
  onDeleteRelapse: (timestamp: number) => void;
  onDeleteTrigger: (timestamp: number) => void;
}

const formatTimestamp = (timestamp: number) =>
  new Date(timestamp).toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

export function ReflectionsDialog({
  open,
  onOpenChange,
  relapseHistory,
  triggerHistory,
  onDeleteRelapse,
  onDeleteTrigger,
}: ReflectionsDialogProps) {
  const items = useMemo<ReflectionItem[]>(() => {
    const merged: ReflectionItem[] = [
      ...relapseHistory.map((entry) => ({ type: "relapse", ...entry })),
      ...triggerHistory.map((entry) => ({ type: "action", ...entry })),
    ];
    return merged.sort((a, b) => b.timestamp - a.timestamp);
  }, [relapseHistory, triggerHistory]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Reflections</DialogTitle>
          <DialogDescription>
            Everything you logged when you slipped or took action.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
          {items.length === 0 ? (
            <div className="rounded-xl border border-dashed p-6 text-center text-sm text-muted-foreground">
              No reflections yet.
            </div>
          ) : (
            items.map((item) => (
              <div
                key={`${item.type}-${item.timestamp}`}
                className="relative rounded-xl border bg-card p-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs font-semibold uppercase tracking-wider ${
                        item.type === "relapse"
                          ? "text-rose-600"
                          : "text-emerald-600"
                      }`}
                    >
                      {item.type === "relapse" ? "Slipped" : "Action"}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {formatTimestamp(item.timestamp)}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    item.type === "relapse"
                      ? onDeleteRelapse(item.timestamp)
                      : onDeleteTrigger(item.timestamp)
                  }
                  className="absolute bottom-3 right-3 rounded-full border border-transparent p-1.5 text-muted-foreground transition hover:bg-muted hover:text-foreground"
                  aria-label="Delete reflection"
                >
                  <Trash2 className="h-4 w-4" />
                </button>

                {item.type === "relapse" ? (
                  <div className="mt-3 space-y-3 text-sm">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                        Lie Believed
                      </p>
                      <p className="text-card-foreground">
                        {item.lie || "Not provided"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                        Change Tomorrow
                      </p>
                      <p className="text-card-foreground">
                        {item.change || "Not provided"}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="mt-3 space-y-3 text-sm">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                        Action Completed
                      </p>
                      <p className="text-card-foreground">
                        {item.actionCompleted}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                        Triggers
                      </p>
                      <p className="text-card-foreground">
                        {item.triggers.length > 0
                          ? item.triggers.join(", ")
                          : "Not provided"}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
