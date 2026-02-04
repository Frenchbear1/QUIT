"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Music, ChevronDown, ChevronUp, Link, ChevronRight } from "lucide-react";
import { musicTracks, musicCategories, type MusicTrack } from "@/lib/data/music";

interface MusicTabProps {
  onPlayTrack?: (track: MusicTrack) => void;
  currentPlayingTrack?: MusicTrack | null;
}

export function MusicTab({ onPlayTrack, currentPlayingTrack }: MusicTabProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [expandedTrack, setExpandedTrack] = useState<string | null>(null);

  // Spotify: store a target URL locally and open Spotify directly (no embed)
  const [spotifyTargetUrl, setSpotifyTargetUrl] = useState<string>("");

  useEffect(() => {
    try {
      const savedTarget = localStorage.getItem("quit.spotify.targetUrl");
      if (typeof savedTarget === "string" && savedTarget.trim()) {
        setSpotifyTargetUrl(savedTarget);
      }
    } catch {
      // ignore storage errors
    }
  }, []);

  useEffect(() => {
    try {
      if (spotifyTargetUrl.trim()) {
        localStorage.setItem("quit.spotify.targetUrl", spotifyTargetUrl.trim());
      } else {
        localStorage.removeItem("quit.spotify.targetUrl");
      }
    } catch {
      // ignore storage errors
    }
  }, [spotifyTargetUrl]);

  const isValidSpotifyUrl = (s: string) => {
    try {
      const u = new URL(s);
      return u.hostname.includes("spotify.com");
    } catch {
      return false;
    }
  };

  const [showSpotifyUrlEditor, setShowSpotifyUrlEditor] = useState(false);

  const openSpotify = () => {
    const target = spotifyTargetUrl.trim();
    const url = target && isValidSpotifyUrl(target) ? target : "https://open.spotify.com/";
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const saveSpotifyUrl = (raw: string) => {
    const next = raw.trim();
    setSpotifyTargetUrl(next);
    try {
      if (next) {
        localStorage.setItem("quit.spotify.targetUrl", next);
      } else {
        localStorage.removeItem("quit.spotify.targetUrl");
      }
    } catch {
      // ignore storage errors
    }
  };

  const filteredTracks =
    activeCategory === "all"
      ? musicTracks
      : musicTracks.filter((t) => t.category === activeCategory);

  const handlePlay = (track: MusicTrack) => {
    if (onPlayTrack) {
      onPlayTrack(track);
    }
  };

  const toggleExpand = (trackId: string) => {
    setExpandedTrack((prev) => (prev === trackId ? null : trackId));
  };

  return (
    <div className="min-h-full pb-24">
      {/* Category Filter */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm z-10 px-4 py-4 border-b border-border">
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {musicCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                activeCategory === cat.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Spotify Controls (centered under filters) */}
      <div className="px-4 pt-4">
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowSpotifyUrlEditor((v) => !v)}
              className={`h-10 w-10 rounded-full transition inline-flex items-center justify-center ${
                showSpotifyUrlEditor
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
              title="Set Spotify playlist/album URL"
              aria-expanded={showSpotifyUrlEditor}
            >
              <Link className="w-4 h-4" />
            </button>

            <button
              onClick={openSpotify}
              className="h-10 px-4 rounded-full bg-primary text-primary-foreground hover:opacity-95 transition inline-flex items-center gap-1 justify-center text-sm font-medium"
              title="Open Spotify"
            >
              Spotify
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Spotify URL dropdown */}
          <div
            className={`mt-3 w-full max-w-xl overflow-hidden transition-all duration-200 ${
              showSpotifyUrlEditor ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
            }`}
            aria-hidden={!showSpotifyUrlEditor}
          >
            <div className="p-3 bg-card border border-border rounded-xl">
              <label className="block text-sm font-medium text-foreground mb-1">
                Spotify playlist / album / track URL
              </label>
              <div className="flex items-center gap-2">
                <input
                  value={spotifyTargetUrl}
                  onChange={(e) => saveSpotifyUrl(e.target.value)}
                  placeholder="https://open.spotify.com/playlist/…"
                  className="flex-1 px-3 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Header Message */}
      <div className="px-4 py-4">
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Music className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-card-foreground font-medium mb-1">
                Fill your mind with something better.
              </p>
              <p className="text-muted-foreground text-sm">
                These songs speak truth over your life. Let them replace the lies.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Track List */}
      <div className="px-4 space-y-3">
        {filteredTracks.map((track, index) => {
          const isExpanded = expandedTrack === track.id;
          const isCurrentlyPlaying = currentPlayingTrack?.id === track.id;

          return (
            <motion.div
              key={track.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
              className={`bg-card border rounded-xl overflow-hidden ${
                isCurrentlyPlaying ? "border-primary" : "border-border"
              }`}
            >
              {/* Track Header */}
              <div className="p-4">
                <div className="flex items-center gap-3">
                  {/* Play Button */}
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handlePlay(track)}
                      className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg bg-primary shadow-primary/20"
                      title={isCurrentlyPlaying ? "Now Playing" : "Play"}
                    >
                      {isCurrentlyPlaying ? (
                        <div className="flex items-end gap-0.5">
                          <div className="w-1 h-3 bg-primary-foreground/90 rounded-full animate-pulse" />
                          <div
                            className="w-1 h-5 bg-primary-foreground/90 rounded-full animate-pulse"
                            style={{ animationDelay: "0.1s" } as CSSProperties}
                          />
                          <div
                            className="w-1 h-2 bg-primary-foreground/90 rounded-full animate-pulse"
                            style={{ animationDelay: "0.2s" } as CSSProperties}
                          />
                        </div>
                      ) : (
                        <Play className="w-5 h-5 text-primary-foreground ml-0.5" />
                      )}
                    </motion.button>

                  {/* Track Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 min-w-0">
                      <h3
                        className={`font-semibold truncate ${
                          isCurrentlyPlaying ? "text-primary" : "text-card-foreground"
                        }`}
                      >
                        {track.title}
                      </h3>

                      {track.url && track.url.startsWith("/audio/") && (
                        <a
                          href={track.url}
                          target="_blank"
                          rel="noreferrer"
                          title="Open audio file"
                          className="shrink-0 inline-flex items-center justify-center h-5 px-2 rounded-full bg-secondary/70 hover:bg-secondary text-muted-foreground hover:text-foreground transition text-xs"
                        >
                          Open
                        </a>
                      )}
                    </div>

                    <p className="text-sm text-muted-foreground truncate">
                      {track.artist}
                    </p>
                  </div>

                  {/* Expand Button */}
                  <button
                    onClick={() => toggleExpand(track.id)}
                    className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                    title={isExpanded ? "Collapse" : "Expand"}
                  >
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Tags */}
                <div className="flex gap-2 mt-3 flex-wrap">
                  {track.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 rounded-full bg-secondary text-secondary-foreground text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Expanded Content */}
              <AnimatePresence>
                {isExpanded && track.description && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 pt-0">
                      <div className="p-3 bg-secondary/50 rounded-lg">
                        <p className="text-sm text-muted-foreground italic">
                          {track.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
