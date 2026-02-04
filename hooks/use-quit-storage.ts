"use client";

import { useState, useEffect, useCallback } from "react";

export interface RelapseEntry {
  timestamp: number;
  lie?: string;
  change?: string;
}

export interface TriggerEntry {
  timestamp: number;
  triggers: string[];
  actionCompleted: string;
}

export interface QuitData {
  firstOpenedDate: number | null;
  streakStartDate: number | null;
  lastRelapseDate: number | null;
  relapseHistory: RelapseEntry[];
  triggerHistory: TriggerEntry[];
  playLaterVideos: string[];
  dayStatuses: Record<string, "good" | "slip">;
}

const createDefaultData = (): QuitData => ({
  firstOpenedDate: Date.now(),
  streakStartDate: Date.now(),
  lastRelapseDate: null,
  relapseHistory: [],
  triggerHistory: [],
  playLaterVideos: [],
  dayStatuses: {},
});

const STORAGE_KEY = "quit-app-data";

const toDateKey = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const startOfDay = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());

export function useQuitStorage() {
  const [data, setData] = useState<QuitData>(createDefaultData);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load data from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          const fallbackFirstOpened =
            typeof parsed.firstOpenedDate === "number"
              ? parsed.firstOpenedDate
              : typeof parsed.streakStartDate === "number"
                ? parsed.streakStartDate
                : Date.now();
          setData({
            ...createDefaultData(),
            ...parsed,
            firstOpenedDate: fallbackFirstOpened,
            dayStatuses: parsed.dayStatuses ?? {},
          });
        } catch {
          setData(createDefaultData());
        }
      } else {
        setData(createDefaultData());
      }
      setIsLoaded(true);
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded && typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
  }, [data, isLoaded]);

  // Log relapse
  const logRelapse = useCallback((lie?: string, change?: string) => {
    const now = Date.now();
    const todayKey = toDateKey(new Date(now));
    const entry: RelapseEntry = {
      timestamp: now,
      lie,
      change,
    };
    setData((prev) => ({
      ...prev,
      lastRelapseDate: now,
      streakStartDate: now,
      relapseHistory: [...prev.relapseHistory, entry],
      dayStatuses: {
        ...prev.dayStatuses,
        [todayKey]: "slip",
      },
    }));
  }, []);

  // Log trigger
  const logTrigger = useCallback((triggers: string[], actionCompleted: string) => {
    const entry: TriggerEntry = {
      timestamp: Date.now(),
      triggers,
      actionCompleted,
    };
    setData((prev) => ({
      ...prev,
      triggerHistory: [...prev.triggerHistory, entry],
    }));
  }, []);

  // Toggle play later video
  const togglePlayLater = useCallback((videoId: string) => {
    setData((prev) => {
      const isInList = prev.playLaterVideos.includes(videoId);
      return {
        ...prev,
        playLaterVideos: isInList
          ? prev.playLaterVideos.filter((id) => id !== videoId)
          : [...prev.playLaterVideos, videoId],
      };
    });
  }, []);

  const deleteRelapseEntry = useCallback((timestamp: number) => {
    setData((prev) => ({
      ...prev,
      relapseHistory: prev.relapseHistory.filter((entry) => entry.timestamp !== timestamp),
    }));
  }, []);

  const deleteTriggerEntry = useCallback((timestamp: number) => {
    setData((prev) => ({
      ...prev,
      triggerHistory: prev.triggerHistory.filter((entry) => entry.timestamp !== timestamp),
    }));
  }, []);

  const setDayStatus = useCallback((date: Date, status: "good" | "slip") => {
    const key = toDateKey(date);
    setData((prev) => ({
      ...prev,
      dayStatuses: {
        ...prev.dayStatuses,
        [key]: status,
      },
    }));
  }, []);

  // Calculate streak days
  const getStreakDays = useCallback(() => {
    if (!data.firstOpenedDate) return 0;
    const firstOpened = startOfDay(new Date(data.firstOpenedDate));
    const today = startOfDay(new Date());
    if (today < firstOpened) return 0;

    let streak = 0;
    for (let d = new Date(today); d >= firstOpened; d.setDate(d.getDate() - 1)) {
      const key = toDateKey(d);
      const status = data.dayStatuses[key] ?? "good";
      if (status === "slip") break;
      streak += 1;
    }
    return streak;
  }, [data.firstOpenedDate, data.dayStatuses]);

  // Calculate time since last relapse
  const getTimeSinceRelapse = useCallback(() => {
    let mostRecentSlip: Date | null = null;
    const entries = Object.entries(data.dayStatuses);
    for (const [key, status] of entries) {
      if (status !== "slip") continue;
      const [year, month, day] = key.split("-").map(Number);
      const date = new Date(year, month - 1, day);
      if (!mostRecentSlip || date > mostRecentSlip) {
        mostRecentSlip = date;
      }
    }

    if (!mostRecentSlip && data.lastRelapseDate) {
      mostRecentSlip = new Date(data.lastRelapseDate);
    }

    if (!mostRecentSlip) return null;
    const now = Date.now();
    const diffMs = now - mostRecentSlip.getTime();
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (days > 0) {
      return `${days} day${days === 1 ? '' : 's'}`;
    }
    return `${hours} hour${hours === 1 ? '' : 's'}`;
  }, [data.dayStatuses, data.lastRelapseDate]);

  return {
    data,
    isLoaded,
    logRelapse,
    logTrigger,
    togglePlayLater,
    deleteRelapseEntry,
    deleteTriggerEntry,
    setDayStatus,
    getStreakDays,
    getTimeSinceRelapse,
  };
}
