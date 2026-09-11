import React, { useState, useEffect, useRef } from 'react';
import {
  INITIAL_TRACKS,
  INITIAL_PLAYLISTS,
  INITIAL_ARTISTS,
  INITIAL_CHARTS,
  DRIVER_PORTRAIT_URL,
} from './data';
import { Track, Playlist, Artist, ChartItem, ViewMode, ActiveTab, CategoryFilter } from './types';
import { DesktopView } from './components/DesktopView';
import { MobileView } from './components/MobileView';
import { TelemetryMarquee } from './components/TelemetryMarquee';
import { ImageManagerModal } from './components/ImageManagerModal';
import { SearchModal } from './components/SearchModal';
import { QueueModal } from './components/QueueModal';
import { LyricsModal } from './components/LyricsModal';
import { DevicesModal } from './components/DevicesModal';
import { audioEngine } from './utils/audioEngine';
import { Monitor, Smartphone, Sparkles, Link2, RotateCcw } from 'lucide-react';

export default function App() {
  // State for data
  const [tracks, setTracks] = useState<Track[]>(INITIAL_TRACKS);
  const [playlists, setPlaylists] = useState<Playlist[]>(INITIAL_PLAYLISTS);
  const [artists, setArtists] = useState<Artist[]>(INITIAL_ARTISTS);
  const [charts] = useState<ChartItem[]>(INITIAL_CHARTS);
  const [driverPortrait, setDriverPortrait] = useState<string>(DRIVER_PORTRAIT_URL);

  // Playback state
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(134); // ~02:14 as in screenshot
  const [volume, setVolume] = useState(0.78);
  const [isShuffle, setIsShuffle] = useState(true);
  const [isRepeat, setIsRepeat] = useState(false);

  // Navigation & View mode
  const [viewMode, setViewMode] = useState<ViewMode>('auto');
  const [activeTab, setActiveTab] = useState<ActiveTab>('inicio');
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');

  // Modals state
  const [isImageManagerOpen, setIsImageManagerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isQueueOpen, setIsQueueOpen] = useState(false);
  const [isLyricsOpen, setIsLyricsOpen] = useState(false);
  const [isDevicesOpen, setIsDevicesOpen] = useState(false);
  const [sessionToast, setSessionToast] = useState<string | null>(null);

  const currentTrack = tracks[currentTrackIndex] || tracks[0];

  // Playback timer simulation
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= currentTrack.duration) {
            if (isRepeat) return 0;
            // Next track
            setCurrentTrackIndex((idx) => (idx + 1) % tracks.length);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, currentTrack.duration, isRepeat, tracks.length]);

  // Audio actions
  const handleTogglePlay = () => {
    const nextState = !isPlaying;
    setIsPlaying(nextState);
    if (nextState) {
      audioEngine.playTrackBeep();
    }
  };

  const handleSeek = (secs: number) => {
    setCurrentTime(Math.max(0, Math.min(secs, currentTrack.duration)));
  };

  const handleSelectTrack = (track: Track) => {
    const index = tracks.findIndex((t) => t.id === track.id);
    if (index !== -1) {
      setCurrentTrackIndex(index);
      setCurrentTime(0);
      setIsPlaying(true);
      audioEngine.playTrackBeep();
    }
  };

  const handleNextTrack = () => {
    if (isShuffle) {
      const rand = Math.floor(Math.random() * tracks.length);
      setCurrentTrackIndex(rand);
    } else {
      setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
    }
    setCurrentTime(0);
    setIsPlaying(true);
    audioEngine.playTrackBeep();
  };

  const handlePrevTrack = () => {
    setCurrentTrackIndex((prev) => (prev === 0 ? tracks.length - 1 : prev - 1));
    setCurrentTime(0);
    setIsPlaying(true);
    audioEngine.playTrackBeep();
  };

  const handleToggleLike = (trackId: string) => {
    setTracks((prev) =>
      prev.map((t) => (t.id === trackId ? { ...t, isLiked: !t.isLiked } : t))
    );
  };

  const handleStartSpeedSession = () => {
    setSessionToast('SESSÃO DE ALTA VELOCIDADE ATIVADA — TUNED ACOUSTICS 174 BPM');
    setIsPlaying(true);
    setTimeout(() => setSessionToast(null), 4000);
  };

  // Image updates
  const handleUpdateTrackImage = (id: string, newUrl: string) => {
    setTracks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, coverUrl: newUrl } : t))
    );
  };

  const handleUpdatePlaylistImage = (id: string, newUrl: string) => {
    setPlaylists((prev) =>
      prev.map((p) => (p.id === id ? { ...p, coverUrl: newUrl } : p))
    );
  };

  const handleUpdateArtistImage = (id: string, newUrl: string) => {
    setArtists((prev) =>
      prev.map((a) => (a.id === id ? { ...a, avatarUrl: newUrl } : a))
    );
  };

  const handleUpdateDriverPortrait = (newUrl: string) => {
    setDriverPortrait(newUrl);
  };

  return (
    <div className="w-full min-h-screen bg-[#08080a] text-[#f4f4f6] font-sans antialiased flex flex-col relative overflow-x-hidden">
      {/* Universal Top Switcher Bar (Directly addresses the user prompt with screens from Image 1 and Image 3, and direct image links) */}
      <div className="w-full bg-[#050507] border-b border-white/10 px-3 py-1.5 flex items-center justify-between text-xs font-mono-tech select-none z-50">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#dc143c] animate-pulse"></span>
          <span className="font-bold text-white tracking-wider">AURA SPEED ENGINE</span>
          <span className="text-white/30 hidden sm:inline">|</span>
          <span className="text-[#ffe600] hidden sm:inline font-bold">CIRCUIT AUDIO TELEMETRY</span>
        </div>

        {/* View Switcher and Direct Image Links Manager */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setIsImageManagerOpen(true)}
            className="px-2.5 py-1 bg-[#dc143c]/20 hover:bg-[#dc143c] text-white flex items-center gap-1.5 border border-[#dc143c]/50 clip-tag transition-all"
            title="Links Diretos para as Imagens do HTML"
          >
            <Link2 className="w-3.5 h-3.5 text-[#ffe600]" />
            <span className="font-bold">LINKS DE IMAGENS</span>
          </button>

          <div className="flex items-center bg-white/5 border border-white/10 p-0.5 rounded">
            <button
              onClick={() => setViewMode('auto')}
              className={`px-2 py-0.5 text-[10px] uppercase font-bold rounded transition-colors ${
                viewMode === 'auto'
                  ? 'bg-white text-black'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Auto
            </button>
            <button
              onClick={() => setViewMode('desktop')}
              className={`px-2 py-0.5 text-[10px] uppercase font-bold rounded flex items-center gap-1 transition-colors ${
                viewMode === 'desktop'
                  ? 'bg-[#dc143c] text-white'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <Monitor className="w-3 h-3" />
              <span className="hidden sm:inline">Cockpit</span>
            </button>
            <button
              onClick={() => setViewMode('mobile')}
              className={`px-2 py-0.5 text-[10px] uppercase font-bold rounded flex items-center gap-1 transition-colors ${
                viewMode === 'mobile'
                  ? 'bg-[#dc143c] text-white'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <Smartphone className="w-3 h-3" />
              <span className="hidden sm:inline">Mobile</span>
            </button>
          </div>
        </div>
      </div>

      {/* Speed Session Toast Notification */}
      {sessionToast && (
        <div className="fixed top-12 left-1/2 -translate-x-1/2 z-50 bg-[#dc143c] text-white px-5 py-2.5 clip-corner shadow-[0_0_30px_rgba(220,20,60,0.8)] font-kinetic font-black text-xs uppercase tracking-wider flex items-center gap-2 animate-bounce">
          <Sparkles className="w-4 h-4 text-[#ffe600]" />
          <span>{sessionToast}</span>
        </div>
      )}

      {/* VIEW RENDERING */}
      {viewMode === 'desktop' ? (
        <div className="flex-1 flex flex-col h-[calc(100vh-36px)] p-2 gap-2 bg-racing-grid overflow-hidden pb-20">
          <TelemetryMarquee bpm={currentTrack.bpm || 174} />
          <DesktopView
            tracks={tracks}
            playlists={playlists}
            artists={artists}
            charts={charts}
            currentTrack={currentTrack}
            isPlaying={isPlaying}
            currentTime={currentTime}
            duration={currentTrack.duration}
            volume={volume}
            isShuffle={isShuffle}
            isRepeat={isRepeat}
            activeCategory={activeCategory}
            activeTab={activeTab}
            driverPortrait={driverPortrait}
            onTogglePlay={handleTogglePlay}
            onSeek={handleSeek}
            onChangeVolume={setVolume}
            onToggleShuffle={() => setIsShuffle(!isShuffle)}
            onToggleRepeat={() => setIsRepeat(!isRepeat)}
            onToggleLike={handleToggleLike}
            onSelectTrack={handleSelectTrack}
            onNextTrack={handleNextTrack}
            onPrevTrack={handlePrevTrack}
            onSelectCategory={setActiveCategory}
            onSelectTab={setActiveTab}
            onOpenImageManager={() => setIsImageManagerOpen(true)}
            onStartSpeedSession={handleStartSpeedSession}
            onOpenSearch={() => setIsSearchOpen(true)}
            onOpenQueue={() => setIsQueueOpen(true)}
            onOpenLyrics={() => setIsLyricsOpen(true)}
            onOpenDevices={() => setIsDevicesOpen(true)}
          />
        </div>
      ) : viewMode === 'mobile' ? (
        <div className="flex-1 flex justify-center bg-[#050507] py-2">
          <MobileView
            tracks={tracks}
            playlists={playlists}
            currentTrack={currentTrack}
            isPlaying={isPlaying}
            currentTime={currentTime}
            duration={currentTrack.duration}
            activeCategory={activeCategory}
            activeTab={activeTab}
            driverPortrait={driverPortrait}
            onTogglePlay={handleTogglePlay}
            onToggleLike={handleToggleLike}
            onSelectTrack={handleSelectTrack}
            onSelectCategory={setActiveCategory}
            onSelectTab={setActiveTab}
            onOpenImageManager={() => setIsImageManagerOpen(true)}
            onStartSpeedSession={handleStartSpeedSession}
            onOpenSearch={() => setIsSearchOpen(true)}
            onOpenQueue={() => setIsQueueOpen(true)}
            onOpenLyrics={() => setIsLyricsOpen(true)}
            onOpenDevices={() => setIsDevicesOpen(true)}
          />
        </div>
      ) : (
        /* AUTO RESPONSIVE MODE: Displays Cockpit on md+ screens and Mobile Edition on small screens */
        <div className="flex-1 flex flex-col">
          {/* Desktop Screen Container */}
          <div className="hidden md:flex flex-col h-[calc(100vh-36px)] p-2 gap-2 bg-racing-grid overflow-hidden pb-20">
            <TelemetryMarquee bpm={currentTrack.bpm || 174} />
            <DesktopView
              tracks={tracks}
              playlists={playlists}
              artists={artists}
              charts={charts}
              currentTrack={currentTrack}
              isPlaying={isPlaying}
              currentTime={currentTime}
              duration={currentTrack.duration}
              volume={volume}
              isShuffle={isShuffle}
              isRepeat={isRepeat}
              activeCategory={activeCategory}
              activeTab={activeTab}
              driverPortrait={driverPortrait}
              onTogglePlay={handleTogglePlay}
              onSeek={handleSeek}
              onChangeVolume={setVolume}
              onToggleShuffle={() => setIsShuffle(!isShuffle)}
              onToggleRepeat={() => setIsRepeat(!isRepeat)}
              onToggleLike={handleToggleLike}
              onSelectTrack={handleSelectTrack}
              onNextTrack={handleNextTrack}
              onPrevTrack={handlePrevTrack}
              onSelectCategory={setActiveCategory}
              onSelectTab={setActiveTab}
              onOpenImageManager={() => setIsImageManagerOpen(true)}
              onStartSpeedSession={handleStartSpeedSession}
              onOpenSearch={() => setIsSearchOpen(true)}
              onOpenQueue={() => setIsQueueOpen(true)}
              onOpenLyrics={() => setIsLyricsOpen(true)}
              onOpenDevices={() => setIsDevicesOpen(true)}
            />
          </div>

          {/* Mobile Screen Container */}
          <div className="flex md:hidden flex-col">
            <MobileView
              tracks={tracks}
              playlists={playlists}
              currentTrack={currentTrack}
              isPlaying={isPlaying}
              currentTime={currentTime}
              duration={currentTrack.duration}
              activeCategory={activeCategory}
              activeTab={activeTab}
              driverPortrait={driverPortrait}
              onTogglePlay={handleTogglePlay}
              onToggleLike={handleToggleLike}
              onSelectTrack={handleSelectTrack}
              onSelectCategory={setActiveCategory}
              onSelectTab={setActiveTab}
              onOpenImageManager={() => setIsImageManagerOpen(true)}
              onStartSpeedSession={handleStartSpeedSession}
              onOpenSearch={() => setIsSearchOpen(true)}
              onOpenQueue={() => setIsQueueOpen(true)}
              onOpenLyrics={() => setIsLyricsOpen(true)}
              onOpenDevices={() => setIsDevicesOpen(true)}
            />
          </div>
        </div>
      )}

      {/* MODALS */}
      <ImageManagerModal
        isOpen={isImageManagerOpen}
        onClose={() => setIsImageManagerOpen(false)}
        tracks={tracks}
        playlists={playlists}
        artists={artists}
        driverPortrait={driverPortrait}
        onUpdateTrackImage={handleUpdateTrackImage}
        onUpdatePlaylistImage={handleUpdatePlaylistImage}
        onUpdateArtistImage={handleUpdateArtistImage}
        onUpdateDriverPortrait={handleUpdateDriverPortrait}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        tracks={tracks}
        playlists={playlists}
        artists={artists}
        onSelectTrack={handleSelectTrack}
      />

      <QueueModal
        isOpen={isQueueOpen}
        onClose={() => setIsQueueOpen(false)}
        currentTrack={currentTrack}
        tracks={tracks}
        onSelectTrack={handleSelectTrack}
      />

      <LyricsModal
        isOpen={isLyricsOpen}
        onClose={() => setIsLyricsOpen(false)}
        track={currentTrack}
        currentTime={currentTime}
      />

      <DevicesModal
        isOpen={isDevicesOpen}
        onClose={() => setIsDevicesOpen(false)}
      />
    </div>
  );
}
