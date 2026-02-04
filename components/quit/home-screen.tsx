"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getRandomSaying } from "@/lib/data/sayings";
import { RelapseModal } from "./relapse-modal";
import { EmergencyVerse } from "./emergency-verse";
import { StreakCalendarDialog } from "./streak-calendar-dialog";
import { ReflectionsDialog } from "./reflections-dialog";

interface HomeScreenProps {
  streakDays: number;
  timeSinceRelapse: string | null;
  onLogRelapse: (lie?: string, change?: string) => void;
  onNavigateToTabs: () => void;
  dayStatuses: Record<string, "good" | "slip">;
  firstOpenedDate: number | null;
  onSetDayStatus: (date: Date, status: "good" | "slip") => void;
  relapseHistory: { timestamp: number; lie?: string; change?: string }[];
  triggerHistory: {
    timestamp: number;
    triggers: string[];
    actionCompleted: string;
  }[];
  onDeleteRelapse: (timestamp: number) => void;
  onDeleteTrigger: (timestamp: number) => void;
}

export function HomeScreen({
  streakDays,
  timeSinceRelapse,
  onLogRelapse,
  onNavigateToTabs,
  dayStatuses,
  firstOpenedDate,
  onSetDayStatus,
  relapseHistory,
  triggerHistory,
  onDeleteRelapse,
  onDeleteTrigger,
}: HomeScreenProps) {
  const [saying, setSaying] = useState("");
  const [showRelapseModal, setShowRelapseModal] = useState(false);
  const [showEmergencyVerse, setShowEmergencyVerse] = useState(false);
  const [buttonPressed, setButtonPressed] = useState(false);
  const [showStreakCalendar, setShowStreakCalendar] = useState(false);
  const [showReflections, setShowReflections] = useState(false);

  useEffect(() => {
    setSaying(getRandomSaying());
  }, []);

  const handleMainButtonClick = () => {
    setButtonPressed(true);
    setTimeout(() => {
      setButtonPressed(false);
      onNavigateToTabs();
    }, 150);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header Stats */}
      <header className="pt-12 pb-6 px-6">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-start"
        >
          <button
            type="button"
            onClick={() => setShowStreakCalendar(true)}
            className="text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 rounded-lg px-1 -ml-1"
            aria-label="Open streak calendar"
          >
            <p className="text-muted-foreground text-sm uppercase tracking-wider">Streak</p>
            <p className="text-4xl font-bold text-foreground">{streakDays} <span className="text-xl font-normal text-muted-foreground">days</span></p>
          </button>
          <div className="text-right">
            <p className="text-muted-foreground text-sm uppercase tracking-wider">Last Relapse</p>
            <p className="text-lg font-medium text-foreground">
              {timeSinceRelapse || "Never"}
            </p>
          </div>
        </motion.div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 pb-8">
        {/* Main Button */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
          className="mb-8"
        >
          <motion.button
            onClick={handleMainButtonClick}
            whileTap={{ scale: 0.95 }}
            animate={buttonPressed ? { scale: 0.95 } : { scale: 1 }}
            className="w-64 h-64 rounded-full bg-primary text-primary-foreground font-bold text-2xl shadow-2xl shadow-primary/20 flex items-center justify-center transition-all hover:shadow-primary/30"
          >
            {"DON'T DO IT."}
          </motion.button>
        </motion.div>

        {/* Mentor Saying */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-muted-foreground text-center text-lg max-w-xs leading-relaxed"
        >
          {saying}
        </motion.p>

        {/* Emergency Verse Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 flex flex-col items-center gap-3"
        >
          <Button
            variant="outline"
            size="lg"
            onClick={() => setShowEmergencyVerse(true)}
            className="gap-2 border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive"
          >
            <Zap className="w-4 h-4" />
            Emergency Verse
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowReflections(true)}
            className="text-muted-foreground hover:text-foreground"
          >
            Reflections
          </Button>
        </motion.div>
      </main>

      {/* Bottom Controls */}
      <footer className="pb-8 px-6">
        {/* I Slipped Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center"
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowRelapseModal(true)}
            className="text-muted-foreground hover:text-destructive"
          >
            I slipped
          </Button>
        </motion.div>
      </footer>

      {/* Modals */}
      <RelapseModal
        open={showRelapseModal}
        onClose={() => setShowRelapseModal(false)}
        onConfirm={onLogRelapse}
      />

      <EmergencyVerse
        open={showEmergencyVerse}
        onClose={() => setShowEmergencyVerse(false)}
      />

      <StreakCalendarDialog
        open={showStreakCalendar}
        onOpenChange={setShowStreakCalendar}
        dayStatuses={dayStatuses}
        firstOpenedDate={firstOpenedDate}
        onSetDayStatus={onSetDayStatus}
      />

      <ReflectionsDialog
        open={showReflections}
        onOpenChange={setShowReflections}
        relapseHistory={relapseHistory}
        triggerHistory={triggerHistory}
        onDeleteRelapse={onDeleteRelapse}
        onDeleteTrigger={onDeleteTrigger}
      />
    </div>
  );
}
