"use client";

import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HomeScreen } from "./home-screen";
import { TabsView } from "./tabs-view";
import { GlobalMusicPlayer } from "./global-music-player";
import { useQuitStorage } from "@/hooks/use-quit-storage";
import { autoplayTrack, type MusicTrack } from "@/lib/data/music";

type View = "home" | "tabs";

export function QuitApp() {
  const [view, setView] = useState<View>("home");
  const [mounted, setMounted] = useState(false);

  // Global music state
  const [currentTrack, setCurrentTrack] = useState<MusicTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showFullscreen, setShowFullscreen] = useState(false);

  const {
    data,
    isLoaded,
    logRelapse,
    logTrigger,
    togglePlayLater,
    setDayStatus,
    deleteRelapseEntry,
    deleteTriggerEntry,
    getStreakDays,
    getTimeSinceRelapse,
  } = useQuitStorage();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Preload the default track to reduce first-play delay
  useEffect(() => {
    if (!autoplayTrack?.url) return;
    const preloadAudio = new Audio();
    preloadAudio.preload = "auto";
    preloadAudio.src = autoplayTrack.url;
    preloadAudio.load();
  }, []);

  const handlePlayTrack = useCallback((track: MusicTrack) => {
    setCurrentTrack(track);
    setIsPlaying(true);
    setShowFullscreen(false); // keep it playing in the background
  }, []);

  const handleTogglePlay = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  const handleClosePlayer = useCallback(() => {
    setCurrentTrack(null);
    setIsPlaying(false);
    setShowFullscreen(false);
  }, []);

  const handleMinimize = useCallback(() => {
    setShowFullscreen(false);
  }, []);

  const handleExpand = useCallback(() => {
    setShowFullscreen(true);
  }, []);

  // Show loading state while data loads
  if (!mounted || !isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <div className="w-10 h-10 rounded-full bg-primary animate-pulse" />
          </div>
          <p className="text-muted-foreground">Loading...</p>
        </motion.div>
      </div>
    );
  }

  const streakDays = getStreakDays();
  const timeSinceRelapse = getTimeSinceRelapse();

  return (
    <>
      {/* Global Music Player - handles the actual iframe */}
      <GlobalMusicPlayer
        track={currentTrack}
        isPlaying={isPlaying}
        showFullscreen={showFullscreen}
        onClose={handleMinimize}
      />

      <AnimatePresence mode="wait">
        {view === "home" ? (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.2 }}
          >
            <HomeScreen
              streakDays={streakDays}
              timeSinceRelapse={timeSinceRelapse}
              onLogRelapse={logRelapse}
              onNavigateToTabs={() => setView("tabs")}
              dayStatuses={data.dayStatuses}
              firstOpenedDate={data.firstOpenedDate}
              onSetDayStatus={setDayStatus}
              relapseHistory={data.relapseHistory}
              triggerHistory={data.triggerHistory}
              onDeleteRelapse={deleteRelapseEntry}
              onDeleteTrigger={deleteTriggerEntry}
            />
          </motion.div>
        ) : (
          <motion.div
            key="tabs"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.2 }}
          >
            <TabsView
              onBack={() => setView("home")}
              playLaterVideos={data.playLaterVideos}
              onTogglePlayLater={togglePlayLater}
              onLogTrigger={logTrigger}
              onPlayMusic={handlePlayTrack}
              currentPlayingTrack={currentTrack}
              isPlaying={isPlaying}
              onTogglePlay={handleTogglePlay}
              onClosePlayer={handleClosePlayer}
              onExpandPlayer={handleExpand}
              showFullscreen={showFullscreen}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
