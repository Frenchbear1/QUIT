"use client";

import { useEffect, useRef } from "react";
import type { MusicTrack } from "@/lib/data/music";

interface GlobalMusicPlayerProps {
  track: MusicTrack | null;
  isPlaying: boolean;
  showFullscreen: boolean;
  onClose: () => void;
}

export function GlobalMusicPlayer({
  track,
  isPlaying,
  showFullscreen,
  onClose,
}: GlobalMusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;

    if (track?.url) {
      if (el.src !== track.url) el.src = track.url;
    }

    if (isPlaying) {
      const p = el.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    } else {
      el.pause();
    }
  }, [track?.url, isPlaying]);

  if (!track) return null;

  return (
    // Single audio element ONLY (never unmount it) so timing doesn’t reset
    <div
      className={`fixed transition-all duration-300 ${
        showFullscreen
          ? "inset-0 z-50 bg-background/98"
          : "w-1 h-1 -left-[9999px] -top-[9999px] opacity-0 pointer-events-none"
      }`}
    >
      <div className={`flex flex-col h-full ${showFullscreen ? "" : "opacity-0"}`}>
        {/* Header */}
        {showFullscreen && (
          <div className="flex items-center justify-between px-4 py-4 border-b border-border">
            <div className="flex-1 min-w-0 pr-4">
              <h2 className="font-bold text-foreground truncate">{track.title}</h2>
              <p className="text-sm text-muted-foreground truncate">{track.artist}</p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              title="Minimize"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m18 15-6-6-6 6" />
              </svg>
            </button>
          </div>
        )}

        {/* Video / Audio iframe */}
        <div className={`${showFullscreen ? "flex-1 flex items-center justify-center p-4" : ""}`}>
          <div className={`${showFullscreen ? "w-full max-w-2xl" : "w-1 h-1"}`}>
            <div className={`${showFullscreen ? "rounded-xl overflow-hidden bg-black/10 p-6" : ""}`}>
              <div className="text-center">
                <div className="text-lg font-semibold text-foreground">{track.title}</div>
                <div className="text-sm text-muted-foreground mt-1">{track.artist}</div>
              </div>
              <audio
                ref={audioRef}
                src={track.url}
                controls
                className={`mt-6 w-full ${showFullscreen ? "" : "w-1 h-1"}`}
                preload="auto"
              />
            </div>
          </div>
        </div>

        {/* Description */}
        {showFullscreen && track.description && (
          <div className="px-4 pb-6">
            <div className="max-w-2xl mx-auto p-4 bg-card border border-border rounded-xl">
              <p className="text-center text-muted-foreground">{track.description}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
