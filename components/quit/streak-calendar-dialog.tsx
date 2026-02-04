"use client";

import { useMemo, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type DayStatus = "good" | "slip";

const toDateKey = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const startOfDay = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());

interface StreakCalendarDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  dayStatuses: Record<string, DayStatus>;
  firstOpenedDate: number | null;
  onSetDayStatus: (date: Date, status: DayStatus) => void;
}

export function StreakCalendarDialog({
  open,
  onOpenChange,
  dayStatuses,
  firstOpenedDate,
  onSetDayStatus,
}: StreakCalendarDialogProps) {
  const today = useMemo(() => startOfDay(new Date()), []);
  const firstOpened = useMemo(
    () => (firstOpenedDate ? startOfDay(new Date(firstOpenedDate)) : null),
    [firstOpenedDate],
  );
  const [month, setMonth] = useState<Date>(() => startOfDay(new Date()));

  const getStatus = (date: Date) => {
    if (!firstOpened) return null;
    const day = startOfDay(date);
    if (day < firstOpened || day > today) return null;
    return dayStatuses[toDateKey(day)] ?? "good";
  };

  const handleDayClick = (date: Date) => {
    const status = getStatus(date);
    if (!status) return;
    const next = status === "slip" ? "good" : "slip";
    onSetDayStatus(date, next);
  };

  const firstOpenedLabel = firstOpened
    ? firstOpened.toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Not available";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Streak Calendar</DialogTitle>
          <DialogDescription>
            First opened: {firstOpenedLabel}
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center">
          <Calendar
            month={month}
            onMonthChange={setMonth}
            captionLayout="dropdown"
            fromYear={firstOpened ? firstOpened.getFullYear() : undefined}
            toYear={today.getFullYear()}
            onDayClick={handleDayClick}
            disabled={(date) => {
              if (!firstOpened) return true;
              const day = startOfDay(date);
              return day < firstOpened || day > today;
            }}
            modifiers={{
              good: (date) => getStatus(date) === "good",
              slip: (date) => getStatus(date) === "slip",
            }}
            classNames={{
              day: "group/day aspect-square",
              today: "bg-transparent text-foreground",
              day_button:
                "rounded-full font-medium transition-colors focus-visible:ring-2 focus-visible:ring-ring/50",
            }}
          />
        </div>
        <p className="text-xs text-muted-foreground">
          Tap a day to toggle between good (green) and slipped (red). Future
          dates are locked.
        </p>
      </DialogContent>
    </Dialog>
  );
}
