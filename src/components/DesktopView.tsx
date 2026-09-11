import React, { useState } from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  Heart,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Search,
  Library,
  Flame,
  Zap,
  Plus,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Bell,
  Sliders,
  Radio,
  Disc,
  ListMusic,
  Mic2,
  Laptop,
  Check,
  TrendingUp,
  Globe,
  Album,
  Link2,
  Layers,
  Sparkles,
  Bookmark
} from 'lucide-react';
import { Track, Playlist, Artist, ChartItem, CategoryFilter, ActiveTab } from '../types';
import { audioEngine } from '../utils/audioEngine';

interface DesktopViewProps {
  tracks: Track[];
  playlists: Playlist[];
  artists: Artist[];
  charts: ChartItem[];
  currentTrack: Track;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isShuffle: boolean;
  isRepeat: boolean;
  activeCategory: CategoryFilter;
  activeTab: ActiveTab;
  driverPortrait: string;
  onTogglePlay: () => void;
  onSeek: (seconds: number) => void;
  onChangeVolume: (val: number) => void;
  onToggleShuffle: () => void;
  onToggleRepeat: () => void;
  onToggleLike: (trackId: string) => void;
  onSelectTrack: (track: Track) => void;
  onNextTrack: () => void;
  onPrevTrack: () => void;
  onSelectCategory: (cat: CategoryFilter) => void;
  onSelectTab: (tab: ActiveTab) => void;
  onOpenImageManager: () => void;
  onStartSpeedSession: () => void;
  onOpenSearch: () => void;
  onOpenQueue: () => void;
  onOpenLyrics: () => void;
  onOpenDevices: () => void;
}

export const DesktopView: React.FC<DesktopViewProps> = ({
  tracks,
  playlists,
  artists,
  charts,
  currentTrack,
  isPlaying,
  currentTime,
  duration,
  volume,
  isShuffle,
  isRepeat,
  activeCategory,
  activeTab,
  driverPortrait,
  onTogglePlay,
  onSeek,
  onChangeVolume,
  onToggleShuffle,
  onToggleRepeat,
  onToggleLike,
  onSelectTrack,
  onNextTrack,
  onPrevTrack,
  onSelectCategory,
  onSelectTab,
  onOpenImageManager,
  onStartSpeedSession,
  onOpenSearch,
  onOpenQueue,
  onOpenLyrics,
  onOpenDevices,
}) => {
  const [libraryFilter, setLibraryFilter] = useState<'all' | 'playlists' | 'artists' | 'albums'>('all');
  const [librarySearch, setLibrarySearch] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [sessionActive, setSessionActive] = useState(false);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const handleStartSession = () => {
    setSessionActive(true);
    audioEngine.playSessionChime();
    onStartSpeedSession();
    setTimeout(() => setSessionActive(false), 3000);
  };

  return (
    <div className="flex-1 flex gap-2 min-h-0 overflow-hidden select-none">
      {/* LEFT SIDEBAR: BRUTALIST RACE-STYLE COCKPIT NAV */}
      <aside className="w-72 shrink-0 flex flex-col gap-2 h-full">
        {/* Brand / Primary Nav Module */}
        <div className="bg-[#111115] border border-white/10 p-3.5 flex flex-col gap-3 relative clip-corner carbon-texture shadow-xl">
          {/* High-Tech Brand Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="relative w-9 h-9 bg-[#dc143c] text-white flex items-center justify-center font-kinetic font-black text-xl italic tracking-tighter shadow-[0_0_20px_rgba(220,20,60,0.5)] clip-corner">
                LN
                <svg
                  className="absolute -bottom-1.5 -right-1.5 w-6 h-4 text-[#ffe600] pointer-events-none"
                  viewBox="0 0 40 25"
                  fill="none"
                >
                  <path
                    d="M2 18 C10 4, 18 22, 28 8 Q35 2, 38 14"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-[19px] font-kinetic font-black tracking-ultra-tight uppercase text-white leading-none">
                    AURA × LN
                  </span>
                  <span className="text-[9px] font-mono-tech bg-white/10 text-[#ff4d6d] px-1 py-0.5 rounded font-bold">
                    PRO
                  </span>
                </div>
                <div className="flex items-center gap-1 mt-0.5">
                  <span className="text-[10px] font-editorial italic text-[#ff4d6d] font-bold">
                    Lando Norris
                  </span>
                  <span className="text-[8px] font-mono-tech uppercase tracking-widest text-white/40">
                    // SOUND LAB
                  </span>
                </div>
              </div>
            </div>

            {/* Animated mini audio pulse */}
            <div className="flex items-end gap-0.5 h-4 w-4">
              <span className={`w-1 bg-[#dc143c] ${isPlaying ? 'eq-bar-1' : 'h-1'} rounded-sm`}></span>
              <span className={`w-1 bg-white ${isPlaying ? 'eq-bar-2' : 'h-2'} rounded-sm`}></span>
              <span className={`w-1 bg-[#dc143c] ${isPlaying ? 'eq-bar-3' : 'h-1'} rounded-sm`}></span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1">
            <button
              onClick={() => onSelectTab('inicio')}
              className={`flex items-center justify-between px-3 py-2.5 font-kinetic font-black text-sm tracking-wide uppercase transition-all clip-corner group text-left w-full ${
                activeTab === 'inicio'
                  ? 'bg-[#dc143c] text-white shadow-[0_0_15px_rgba(220,20,60,0.4)]'
                  : 'hover:bg-white/5 text-white/70 hover:text-white border border-transparent hover:border-white/10'
              }`}
            >
              <div className="flex items-center gap-3">
                <Flame className="w-5 h-5 text-white" />
                <span>INÍCIO // FEED</span>
              </div>
              <span className="font-mono-tech text-[10px] text-white/80 group-hover:translate-x-0.5 transition-transform">
                01
              </span>
            </button>

            <button
              onClick={onOpenSearch}
              className={`flex items-center justify-between px-3 py-2.5 font-kinetic font-bold text-sm tracking-wide uppercase transition-all border border-transparent hover:border-white/10 group text-left w-full ${
                activeTab === 'buscar'
                  ? 'bg-[#dc143c] text-white'
                  : 'hover:bg-white/5 text-white/70 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Search className="w-5 h-5" />
                <span>BUSCA TELEMÉTRICA</span>
              </div>
              <span className="font-mono-tech text-[10px] text-white/30">02</span>
            </button>

            <button
              onClick={() => onSelectTab('biblioteca')}
              className={`flex items-center justify-between px-3 py-2.5 font-kinetic font-bold text-sm tracking-wide uppercase transition-all border border-transparent hover:border-white/10 group text-left w-full ${
                activeTab === 'biblioteca'
                  ? 'bg-[#dc143c] text-white'
                  : 'hover:bg-white/5 text-white/70 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Library className="w-5 h-5" />
                <span>SUA BIBLIOTECA</span>
              </div>
              <span className="font-mono-tech text-[10px] text-white/30">03</span>
            </button>
          </nav>
        </div>

        {/* Secondary Library / Race-Control Box */}
        <div className="flex-1 bg-[#111115] border border-white/10 p-3 flex flex-col min-h-0 overflow-hidden relative">
          <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-2">
            <div className="flex items-center gap-2 text-white">
              <ListMusic className="w-4 h-4 text-[#dc143c]" />
              <span className="font-kinetic font-black text-xs tracking-widest uppercase">
                PLAYLISTS & SETS
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={onOpenImageManager}
                className="px-2 h-6 border border-white/20 text-white/70 hover:text-white hover:bg-[#dc143c] hover:border-[#dc143c] flex items-center justify-center transition-all text-[10px] font-mono-tech clip-tag"
                title="Gerenciar links diretos de imagens"
              >
                <Link2 className="w-3 h-3 mr-1" />
                LINKS
              </button>
            </div>
          </div>

          {/* Tactical Tag Filters */}
          <div className="flex items-center gap-1.5 pb-2 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setLibraryFilter('all')}
              className={`px-2.5 py-1 text-[10px] font-mono-tech font-bold uppercase clip-tag transition-colors ${
                libraryFilter === 'all'
                  ? 'bg-white text-black'
                  : 'bg-white/5 border border-white/10 text-white/70 hover:text-white'
              }`}
            >
              TODOS
            </button>
            <button
              onClick={() => setLibraryFilter('playlists')}
              className={`px-2.5 py-1 text-[10px] font-mono-tech font-bold uppercase clip-tag transition-colors ${
                libraryFilter === 'playlists'
                  ? 'bg-white text-black'
                  : 'bg-white/5 border border-white/10 text-white/70 hover:text-white'
              }`}
            >
              PLAYLISTS
            </button>
            <button
              onClick={() => setLibraryFilter('artists')}
              className={`px-2.5 py-1 text-[10px] font-mono-tech font-bold uppercase clip-tag transition-colors ${
                libraryFilter === 'artists'
                  ? 'bg-white text-black'
                  : 'bg-white/5 border border-white/10 text-white/70 hover:text-white'
              }`}
            >
              ARTISTAS
            </button>
          </div>

          {/* Search in library */}
          <div className="flex items-center justify-between py-1.5 px-1 text-[11px] font-mono-tech text-white/40 border-b border-white/5">
            <div className="flex items-center gap-1 flex-1">
              <Search className="w-3 h-3 text-white/40" />
              <input
                type="text"
                placeholder="FILTRAR NA BIBLIOTECA..."
                value={librarySearch}
                onChange={(e) => setLibrarySearch(e.target.value)}
                className="bg-transparent text-white text-[11px] placeholder:text-white/30 focus:outline-none w-full"
              />
            </div>
            <span className="text-[#dc143c] font-bold cursor-pointer shrink-0 ml-1">RECENTES</span>
          </div>

          {/* Scrollable Library Item List with Kinetic Hover */}
          <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-1.5 pt-2 pr-1">
            {/* Liked Songs Special Card */}
            <div
              onClick={() => onSelectTrack(tracks[0])}
              className="flex items-center gap-2.5 p-2 bg-white/[0.02] hover:bg-[#dc143c]/20 border border-white/5 hover:border-[#dc143c]/40 transition-all cursor-pointer group"
            >
              <div className="w-10 h-10 bg-[#dc143c] flex items-center justify-center shrink-0 clip-corner shadow-[0_0_15px_rgba(220,20,60,0.4)]">
                <Heart className="w-5 h-5 text-white fill-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-kinetic font-black text-xs text-white uppercase tracking-tight group-hover:text-[#ff4d6d] transition-colors truncate">
                  MÚSICAS CURTIDAS
                </div>
                <div className="text-[10px] font-mono-tech text-white/50 flex items-center gap-1.5 mt-0.5">
                  <span className="text-[#dc143c] font-black">#PIN</span>
                  <span>• 1.428 TRACKS</span>
                </div>
              </div>
            </div>

            {/* Playlists in sidebar */}
            {playlists
              .filter((pl) => pl.title.toLowerCase().includes(librarySearch.toLowerCase()))
              .map((pl) => (
                <div
                  key={pl.id}
                  onClick={() => {
                    const matchedTrack = tracks.find((t) =>
                      t.title.toLowerCase().includes(pl.title.split(' ')[0].toLowerCase())
                    ) || tracks[0];
                    onSelectTrack(matchedTrack);
                  }}
                  className={`flex items-center gap-2.5 p-2 border transition-all cursor-pointer group ${
                    currentTrack.title.toUpperCase().includes(pl.title.split(' ')[0])
                      ? 'bg-[#dc143c]/15 border-[#dc143c]/60'
                      : 'bg-white/[0.02] hover:bg-white/5 border-white/5 hover:border-white/20'
                  }`}
                >
                  {pl.coverUrl ? (
                    <img
                      src={pl.coverUrl}
                      alt={pl.title}
                      className="w-10 h-10 object-cover shrink-0 grayscale group-hover:grayscale-0 transition-all border border-white/10"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-gradient-to-br from-[#dc143c] to-black flex items-center justify-center shrink-0">
                      <Heart className="w-4 h-4 text-white fill-white" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="font-kinetic font-black text-xs text-white uppercase tracking-tight group-hover:text-[#ff4d6d] transition-colors truncate">
                      {pl.title}
                    </div>
                    <div className="text-[10px] font-mono-tech text-white/50 truncate mt-0.5">
                      {pl.subtitle}
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {/* Bottom Telemetry Specs Widget */}
          <div className="mt-2 p-2 bg-black/50 border border-white/10 font-mono-tech text-[10px] flex items-center justify-between text-white/60">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-[#ffe600] rounded-full animate-pulse"></span>
              SYSTEM OK
            </span>
            <span className="text-[#dc143c] font-black">DAC 96KHZ</span>
          </div>
        </div>
      </aside>

      {/* MAIN SCROLLABLE CONTENT AREA (HIGH-OCTANE KINETIC GRID) */}
      <main className="flex-1 bg-[#111115] border border-white/10 flex flex-col min-h-0 overflow-hidden relative">
        {/* Top Sticky Navigation Bar */}
        <header className="sticky top-0 z-40 flex justify-between items-center w-full px-6 py-3 bg-[#111115]/95 backdrop-blur-xl border-b border-white/10">
          {/* Nav arrows + brutalist status pills */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <button
                onClick={onPrevTrack}
                className="w-7 h-7 bg-white/5 hover:bg-white/15 border border-white/10 text-white flex items-center justify-center transition-colors"
                title="Voltar"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={onNextTrack}
                className="w-7 h-7 bg-white/5 hover:bg-white/15 border border-white/10 text-white flex items-center justify-center transition-colors"
                title="Avançar"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => onSelectCategory('all')}
                className={`px-3 py-1 font-kinetic font-black text-xs uppercase tracking-wider clip-tag transition-all ${
                  activeCategory === 'all'
                    ? 'bg-[#dc143c] text-white shadow-[0_0_15px_rgba(220,20,60,0.4)]'
                    : 'bg-white/5 border border-white/10 hover:border-white/30 text-white/80'
                }`}
              >
                TUDO // ALL
              </button>
              <button
                onClick={() => onSelectCategory('musica')}
                className={`px-3 py-1 font-kinetic font-bold text-xs uppercase tracking-wider clip-tag transition-all ${
                  activeCategory === 'musica'
                    ? 'bg-[#dc143c] text-white'
                    : 'bg-white/5 border border-white/10 hover:border-white/30 text-white/80'
                }`}
              >
                MÚSICA
              </button>
              <button
                onClick={() => onSelectCategory('podcasts')}
                className={`px-3 py-1 font-kinetic font-bold text-xs uppercase tracking-wider clip-tag transition-all ${
                  activeCategory === 'podcasts'
                    ? 'bg-[#dc143c] text-white'
                    : 'bg-white/5 border border-white/10 hover:border-white/30 text-white/80'
                }`}
              >
                PODCASTS
              </button>
              <button
                onClick={() => onSelectCategory('paddock')}
                className={`px-3 py-1 font-kinetic font-bold text-xs uppercase tracking-wider clip-tag transition-all flex items-center gap-1 ${
                  activeCategory === 'paddock'
                    ? 'bg-[#dc143c] text-white'
                    : 'bg-white/5 border border-white/10 hover:border-white/30 text-[#ffe600]'
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                PADDOCK AUDIO
              </button>
            </div>
          </div>

          {/* Right Action Controls & Driver Profile */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenImageManager}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 hover:bg-white/15 border border-white/15 text-white font-mono-tech text-xs clip-tag transition-colors"
              title="Gerenciar URLs diretos das imagens"
            >
              <Link2 className="w-3.5 h-3.5 text-[#dc143c]" />
              <span>LINKS IMAGENS</span>
            </button>

            <button
              onClick={handleStartSession}
              className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#ffe600] hover:bg-white text-black font-kinetic font-black text-xs uppercase tracking-tight transition-transform active:scale-95 clip-corner shadow-lg"
            >
              <span>ASSINAR PREMIUM SPEED</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => alert('Telemetria do Circuito: Transmissão sem perdas (96kHz FLAC) ativa no setor Interlagos.')}
              className="w-8 h-8 border border-white/10 bg-white/5 text-white/70 hover:text-white hover:bg-white/10 flex items-center justify-center transition-colors relative"
              title="Telemetria"
            >
              <Bell className="w-4 h-4" />
              <span className="w-1.5 h-1.5 bg-[#dc143c] absolute top-1.5 right-1.5"></span>
            </button>

            {/* Driver Profile Chip */}
            <div className="flex items-center gap-2 pl-2 border-l border-white/10">
              <div className="w-8 h-8 rounded-none border-2 border-[#dc143c] overflow-hidden clip-corner">
                <img
                  src={driverPortrait}
                  alt="Driver #04"
                  className="w-full h-full object-cover grayscale contrast-125"
                />
              </div>
              <div className="hidden lg:flex flex-col text-left">
                <span className="text-xs font-kinetic font-black uppercase tracking-tight text-white leading-none">
                  DRIVER #04
                </span>
                <span className="text-[9px] font-mono-tech text-[#dc143c] font-bold">
                  GRID POSITION: P1
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Canvas Body */}
        <div className="flex-1 overflow-y-auto custom-scrollbar px-6 pb-16 pt-4 relative">
          {/* Ambient Glow */}
          <div className="absolute top-0 right-1/4 w-96 h-48 bg-[#dc143c]/15 blur-[100px] pointer-events-none"></div>

          {/* KINETIC HERO BANNER // HIGH OCTANE SPEED */}
          <div className="relative mb-8 p-6 md:p-8 bg-gradient-to-r from-[#1f1f26] via-[#16161b] to-[#050507] border border-white/15 clip-corner-rev overflow-hidden shadow-2xl">
            {/* Angled line accents */}
            <div className="absolute right-0 top-0 bottom-0 w-2/5 opacity-15 pointer-events-none bg-[repeating-linear-gradient(45deg,#fff_0,#fff_2px,transparent_0,transparent_16px)]"></div>
            {/* Hand-drawn racing signature scribble */}
            <div className="absolute -right-6 -bottom-8 w-72 h-44 opacity-25 pointer-events-none">
              <svg viewBox="0 0 260 140" fill="none" className="w-full h-full">
                <path
                  d="M12 95 C45 30, 75 110, 110 35 C130 -10, 145 120, 175 40 C190 5, 205 80, 240 65 M50 115 Q130 90 220 105 M95 85 L180 82"
                  stroke="#dc143c"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 mb-3 font-mono-tech text-[11px] uppercase tracking-widest text-[#ff4d6d] font-black">
                  <span className="bg-[#dc143c] text-white px-2.5 py-1 text-[9px] font-black clip-tag shadow-[0_0_15px_rgba(220,20,60,0.5)]">
                    OFFICIAL LN#04 LAB
                  </span>
                  <span className="text-white/40">///</span>
                  <span className="text-[#ffe600] tracking-wider font-bold">
                    CIRCUIT AUDIO ENGINE
                  </span>
                  <span className="hidden sm:inline-flex items-center gap-1 ml-2 text-white/50 text-[10px] font-editorial italic text-base capitalize">
                    "it doesn't matter where you start"
                  </span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl uppercase tracking-ultra-tight text-white leading-[0.92]">
                  <span className="font-kinetic font-black block text-white">HIGH VELOCITY</span>
                  <span className="flex items-center flex-wrap gap-x-3 gap-y-1 mt-1">
                    <span className="font-editorial italic font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff4d6d] via-white to-[#ffe600] capitalize text-[1.15em] tracking-tight">
                      Acoustics
                    </span>
                    <span className="font-mono-tech text-xs text-[#dc143c] font-black tracking-widest bg-white/5 border border-[#dc143c]/40 px-2 py-0.5 clip-tag">
                      LN ON // OFF TRACK
                    </span>
                  </span>
                </h1>

                <p className="text-white/60 font-mono-tech text-xs uppercase tracking-wider mt-3 flex flex-wrap items-center gap-2.5">
                  <span>BPM ELEVATED</span>
                  <span className="text-[#dc143c] font-black">///</span>
                  <span className="font-editorial italic text-white/80 text-sm tracking-normal capitalize">
                    Dynamic Soundscapes for apex focus & high performance
                  </span>
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={handleStartSession}
                  className={`px-6 py-3.5 font-kinetic font-black text-sm uppercase tracking-wider flex items-center gap-2 clip-corner transition-all hover:scale-105 active:scale-95 border-l-2 border-white ${
                    sessionActive
                      ? 'bg-emerald-500 text-black shadow-[0_0_30px_rgba(16,185,129,0.7)]'
                      : 'bg-[#dc143c] hover:bg-red-600 text-white shadow-[0_0_30px_rgba(220,20,60,0.6)]'
                  }`}
                >
                  <Play className="w-5 h-5 fill-current" />
                  <span>
                    {sessionActive ? 'SESSÃO DE VELOCIDADE ATIVA' : 'INICIAR SESSÃO VELOCIDADE'}
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* QUICK ACCESS GRID (6 DUAL COLUMN CARDS) */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 mb-10">
            {/* Card 1: Músicas Curtidas */}
            <div
              onClick={() => onSelectTrack(tracks[0])}
              className="group kinetic-card flex items-center bg-[#16161b] border border-white/10 hover:border-[#dc143c]/80 transition-all cursor-pointer relative overflow-hidden pr-3"
            >
              <div className="w-18 h-18 bg-gradient-to-br from-[#dc143c] to-black shrink-0 flex items-center justify-center p-4">
                <Heart className="w-8 h-8 text-white fill-white" />
              </div>
              <div className="flex flex-col px-3.5 flex-1 min-w-0">
                <span className="font-mono-tech text-[9px] text-[#ff4d6d] uppercase font-bold">
                  FAVORITOS // APEX
                </span>
                <span className="font-kinetic font-black text-sm text-white uppercase tracking-tight truncate group-hover:text-[#ff4d6d] transition-colors">
                  MÚSICAS CURTIDAS
                </span>
              </div>
              <button
                className="w-10 h-10 bg-[#dc143c] text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-[0_0_15px_rgba(220,20,60,0.4)] shrink-0 hover:scale-110 active:scale-95"
                title="Reproduzir"
              >
                <Play className="w-5 h-5 fill-current" />
              </button>
            </div>

            {/* Card 2: Starboy Now Playing */}
            <div
              onClick={() => onSelectTrack(tracks[0])}
              className="group kinetic-card flex items-center bg-[#16161b] border border-[#dc143c]/80 transition-all cursor-pointer relative overflow-hidden pr-3 shadow-[0_0_15px_rgba(220,20,60,0.2)]"
            >
              <div className="relative w-18 h-18 shrink-0">
                <img
                  src={tracks[0].coverUrl}
                  alt={tracks[0].title}
                  className="w-18 h-18 object-cover"
                />
                <div className="absolute top-1 left-1 bg-[#dc143c] text-[8px] font-mono-tech font-black text-white px-1">
                  NOW
                </div>
              </div>
              <div className="flex flex-col px-3.5 flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-mono-tech text-[9px] text-[#ffe600] uppercase font-bold">
                    EM REPRODUÇÃO
                  </span>
                  {isPlaying && (
                    <div className="flex items-end gap-0.5 h-2.5">
                      <span className="w-0.5 bg-[#dc143c] eq-bar-1"></span>
                      <span className="w-0.5 bg-[#dc143c] eq-bar-2"></span>
                      <span className="w-0.5 bg-[#dc143c] eq-bar-3"></span>
                    </div>
                  )}
                </div>
                <span className="font-kinetic font-black text-sm text-white uppercase tracking-tight truncate group-hover:text-[#ff4d6d] transition-colors">
                  {tracks[0].title}
                </span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onTogglePlay();
                }}
                className="w-10 h-10 bg-[#dc143c] text-white flex items-center justify-center opacity-100 transition-all duration-200 shadow-[0_0_15px_rgba(220,20,60,0.4)] shrink-0 hover:scale-110 active:scale-95"
                title={isPlaying ? 'Pausar' : 'Reproduzir'}
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 fill-current" />
                ) : (
                  <Play className="w-5 h-5 fill-current" />
                )}
              </button>
            </div>

            {/* Card 3: Top Brasil Velocidade */}
            <div
              onClick={() => onSelectTrack(tracks[1])}
              className="group kinetic-card flex items-center bg-[#16161b] border border-white/10 hover:border-[#dc143c]/80 transition-all cursor-pointer relative overflow-hidden pr-3"
            >
              <img
                src={playlists[2].coverUrl}
                alt="Top Brasil"
                className="w-18 h-18 object-cover shrink-0 grayscale group-hover:grayscale-0 transition-all"
              />
              <div className="flex flex-col px-3.5 flex-1 min-w-0">
                <span className="font-mono-tech text-[9px] text-white/50 uppercase font-bold">
                  CHART 01 // BR
                </span>
                <span className="font-kinetic font-black text-sm text-white uppercase tracking-tight truncate group-hover:text-[#ff4d6d] transition-colors">
                  TOP BRASIL VELOCIDADE
                </span>
              </div>
              <button
                className="w-10 h-10 bg-[#dc143c] text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-[0_0_15px_rgba(220,20,60,0.4)] shrink-0 hover:scale-110 active:scale-95"
                title="Reproduzir"
              >
                <Play className="w-5 h-5 fill-current" />
              </button>
            </div>

            {/* Card 4: Daily Mix 01 */}
            <div
              onClick={() => onSelectTrack(tracks[2])}
              className="group kinetic-card flex items-center bg-[#16161b] border border-white/10 hover:border-[#dc143c]/80 transition-all cursor-pointer relative overflow-hidden pr-3"
            >
              <img
                src={playlists[3].coverUrl}
                alt="Daily Mix 01"
                className="w-18 h-18 object-cover shrink-0 grayscale group-hover:grayscale-0 transition-all"
              />
              <div className="flex flex-col px-3.5 flex-1 min-w-0">
                <span className="font-mono-tech text-[9px] text-white/50 uppercase font-bold">
                  MIX DIÁRIO // 01
                </span>
                <span className="font-kinetic font-black text-sm text-white uppercase tracking-tight truncate group-hover:text-[#ff4d6d] transition-colors">
                  DAILY MIX 01
                </span>
              </div>
              <button
                className="w-10 h-10 bg-[#dc143c] text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-[0_0_15px_rgba(220,20,60,0.4)] shrink-0 hover:scale-110 active:scale-95"
                title="Reproduzir"
              >
                <Play className="w-5 h-5 fill-current" />
              </button>
            </div>

            {/* Card 5: Synthwave Nights */}
            <div
              onClick={() => onSelectTrack(tracks[4])}
              className="group kinetic-card flex items-center bg-[#16161b] border border-white/10 hover:border-[#dc143c]/80 transition-all cursor-pointer relative overflow-hidden pr-3"
            >
              <img
                src={playlists[5].coverUrl}
                alt="Synthwave Nights"
                className="w-18 h-18 object-cover shrink-0 grayscale group-hover:grayscale-0 transition-all"
              />
              <div className="flex flex-col px-3.5 flex-1 min-w-0">
                <span className="font-mono-tech text-[9px] text-white/50 uppercase font-bold">
                  NOCTURNAL // APEX
                </span>
                <span className="font-kinetic font-black text-sm text-white uppercase tracking-tight truncate group-hover:text-[#ff4d6d] transition-colors">
                  SYNTHWAVE NIGHTS
                </span>
              </div>
              <button
                className="w-10 h-10 bg-[#dc143c] text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-[0_0_15px_rgba(220,20,60,0.4)] shrink-0 hover:scale-110 active:scale-95"
                title="Reproduzir"
              >
                <Play className="w-5 h-5 fill-current" />
              </button>
            </div>

            {/* Card 6: Radar de Novidades */}
            <div
              onClick={() => onSelectTrack(tracks[3])}
              className="group kinetic-card flex items-center bg-[#16161b] border border-white/10 hover:border-[#dc143c]/80 transition-all cursor-pointer relative overflow-hidden pr-3"
            >
              <img
                src={playlists[4].coverUrl}
                alt="Radar de Novidades"
                className="w-18 h-18 object-cover shrink-0 grayscale group-hover:grayscale-0 transition-all"
              />
              <div className="flex flex-col px-3.5 flex-1 min-w-0">
                <span className="font-mono-tech text-[9px] text-white/50 uppercase font-bold">
                  FREQUÊNCIA // NEW
                </span>
                <span className="font-kinetic font-black text-sm text-white uppercase tracking-tight truncate group-hover:text-[#ff4d6d] transition-colors">
                  RADAR DE NOVIDADES
                </span>
              </div>
              <button
                className="w-10 h-10 bg-[#dc143c] text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-[0_0_15px_rgba(220,20,60,0.4)] shrink-0 hover:scale-110 active:scale-95"
                title="Reproduzir"
              >
                <Play className="w-5 h-5 fill-current" />
              </button>
            </div>
          </div>

          {/* SECTION: HIGH OCTANE BEATS // RACE DAY CURATION */}
          <section className="mb-10">
            <div className="flex items-end justify-between mb-4 border-b border-white/10 pb-2">
              <div>
                <div className="font-mono-tech text-[10px] text-[#dc143c] uppercase font-black tracking-widest">
                  SECTOR 02 // CURATED SPEEDS
                </div>
                <h2 className="text-2xl uppercase tracking-tight text-white flex items-center gap-2.5">
                  <span className="font-kinetic font-black">HIGH OCTANE</span>
                  <span className="font-editorial italic font-bold text-[#ff4d6d] lowercase text-3xl">
                    beats
                  </span>
                  <span className="text-xs font-mono-tech text-[#ffe600] bg-white/5 border border-white/10 px-2 py-0.5 clip-tag font-bold">
                    [MAX RPM • LN04]
                  </span>
                </h2>
              </div>
              <button
                onClick={onOpenQueue}
                className="text-xs font-mono-tech font-bold uppercase tracking-wider text-[#ff4d6d] hover:text-white transition-colors flex items-center gap-1"
              >
                <span>VER TODOS</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3.5">
              {playlists.slice(0, 6).map((item, idx) => (
                <div
                  key={item.id}
                  onClick={() => {
                    const track = tracks[idx % tracks.length];
                    onSelectTrack(track);
                  }}
                  className="kinetic-card bg-[#16161b] border border-white/10 p-3 flex flex-col group cursor-pointer"
                >
                  <div className="relative aspect-square w-full mb-3 bg-black overflow-hidden clip-corner">
                    {item.coverUrl ? (
                      <img
                        src={item.coverUrl}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 grayscale group-hover:grayscale-0"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#dc143c] to-black flex items-center justify-center">
                        <Heart className="w-8 h-8 text-white fill-white" />
                      </div>
                    )}
                    <div className="absolute top-2 left-2 bg-black/80 font-mono-tech text-[9px] text-white px-1.5 py-0.5 border border-white/20">
                      {item.badge || '174 BPM'}
                    </div>
                    <button
                      className="absolute bottom-2 right-2 w-11 h-11 bg-[#dc143c] text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-[0_0_20px_rgba(220,20,60,0.6)] hover:scale-110"
                      title="Reproduzir"
                    >
                      <Play className="w-5 h-5 fill-current" />
                    </button>
                  </div>
                  <span className="font-kinetic font-black text-xs uppercase text-white tracking-tight truncate group-hover:text-[#ff4d6d] transition-colors">
                    {item.title}
                  </span>
                  <p className="font-mono-tech text-[10px] text-white/50 truncate mt-1">
                    {item.subtitle}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION: PADDOCK LINEUP // TOP ARTISTS (BRUTALIST CIRCULAR APEX) */}
          <section className="mb-10">
            <div className="flex items-end justify-between mb-4 border-b border-white/10 pb-2">
              <div>
                <div className="font-mono-tech text-[10px] text-[#ffe600] uppercase font-black tracking-widest">
                  DRIVERS & CREATORS // SECTOR 03
                </div>
                <h2 className="text-2xl uppercase tracking-tight text-white flex items-center gap-2">
                  <span className="font-kinetic font-black">PADDOCK RADIO</span>
                  <span className="font-editorial italic font-bold text-[#ff4d6d] text-3xl capitalize">
                    Headliners
                  </span>
                </h2>
              </div>
              <button
                onClick={onOpenImageManager}
                className="text-xs font-mono-tech font-bold uppercase tracking-wider text-[#ff4d6d] hover:text-white transition-colors flex items-center gap-1"
              >
                <span>EXIBIR ROSTER</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3.5">
              {artists.map((artist) => (
                <div
                  key={artist.id}
                  onClick={() => {
                    const matchedTrack = tracks.find((t) =>
                      t.artist.toLowerCase().includes(artist.name.toLowerCase())
                    ) || tracks[0];
                    onSelectTrack(matchedTrack);
                  }}
                  className="kinetic-card bg-[#16161b] border border-white/10 p-3 flex flex-col items-center text-center group cursor-pointer"
                >
                  <div className="relative w-full aspect-square rounded-full overflow-hidden mb-3 border-2 border-[#dc143c]/40 group-hover:border-[#dc143c] shadow-lg transition-colors">
                    <img
                      src={artist.avatarUrl}
                      alt={artist.name}
                      className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all"
                    />
                    <button
                      className="absolute inset-0 bg-[#dc143c]/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Reproduzir artista"
                    >
                      <Play className="w-7 h-7 fill-current" />
                    </button>
                  </div>
                  <span className="font-kinetic font-black text-xs uppercase text-white tracking-tight truncate w-full group-hover:text-[#ff4d6d]">
                    {artist.name}
                  </span>
                  <span className="font-mono-tech text-[9px] text-[#dc143c] font-black uppercase mt-0.5">
                    {artist.role}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION: PARADAS TELEMÉTRICAS // CHARTS */}
          <section>
            <div className="flex items-end justify-between mb-4 border-b border-white/10 pb-2">
              <div>
                <div className="font-mono-tech text-[10px] text-white/50 uppercase font-black tracking-widest">
                  LEADERBOARDS // LAP RECORDS
                </div>
                <h2 className="text-2xl font-kinetic font-black uppercase tracking-tight text-white">
                  PARADAS EM DESTAQUE
                </h2>
              </div>
              <button
                onClick={onOpenQueue}
                className="text-xs font-mono-tech font-bold uppercase tracking-wider text-[#ff4d6d] hover:text-white transition-colors flex items-center gap-1"
              >
                <span>VER TODOS OS CHARTS</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {charts.map((chart) => (
                <div
                  key={chart.id}
                  onClick={() => onSelectTrack(tracks[0])}
                  className="kinetic-card bg-[#16161b] border border-[#dc143c]/40 hover:border-[#dc143c] p-4 clip-corner relative overflow-hidden group cursor-pointer"
                >
                  <div className="absolute -right-4 -bottom-4 text-7xl font-kinetic font-black text-white/[0.04] select-none">
                    {chart.rank}
                  </div>
                  <div className="flex justify-between items-start mb-6">
                    <span
                      className={`font-mono-tech text-[10px] font-black px-2 py-0.5 clip-tag ${
                        chart.accentColor === '#ffe600'
                          ? 'bg-[#ffe600] text-black'
                          : chart.accentColor === '#dc143c'
                          ? 'bg-[#dc143c] text-white'
                          : 'bg-white/10 text-white'
                      }`}
                    >
                      {chart.tag}
                    </span>
                    {chart.id === 'ch-1' ? (
                      <TrendingUp className="w-5 h-5 text-[#dc143c]" />
                    ) : chart.id === 'ch-2' ? (
                      <Globe className="w-5 h-5 text-white/70" />
                    ) : chart.id === 'ch-3' ? (
                      <Zap className="w-5 h-5 text-[#ffe600]" />
                    ) : (
                      <Album className="w-5 h-5 text-white/70" />
                    )}
                  </div>
                  <h3 className="text-3xl font-kinetic font-black uppercase text-white leading-none tracking-tight">
                    {chart.title}
                    <br />
                    <span
                      className="text-xl"
                      style={{ color: chart.accentColor }}
                    >
                      {chart.region}
                    </span>
                  </h3>
                  <p className="font-mono-tech text-[10px] text-white/50 uppercase mt-3">
                    {chart.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* FIXED BOTTOM TRANSPORT / COCKPIT TELEMETRY PLAYBACK BAR */}
      <footer className="fixed bottom-0 left-0 right-0 h-20 border-t border-white/15 bg-[#0e0e11]/95 backdrop-blur-2xl flex items-center justify-between px-4 z-50 select-none clip-corner">
        {/* Accent Red Indicator Line Top */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#dc143c] to-transparent"></div>

        {/* LEFT: Currently Playing Track Info (With Live Equalizer) */}
        <div className="flex items-center gap-3 w-1/4 min-w-[220px]">
          <div className="relative group shrink-0 border border-white/15 clip-corner">
            <img
              src={currentTrack.coverUrl}
              alt={currentTrack.title}
              className="w-12 h-12 object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all"
            />
            <div className="absolute inset-0 bg-[#dc143c]/15 pointer-events-none"></div>
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-kinetic font-black text-sm uppercase tracking-tight text-white hover:text-[#ff4d6d] transition-colors truncate">
                {currentTrack.title}
              </span>
              {isPlaying && (
                <span className="w-1.5 h-1.5 bg-[#dc143c] rounded-full animate-ping"></span>
              )}
            </div>
            <span className="font-mono-tech text-[10px] text-white/60 truncate uppercase">
              {currentTrack.artist}
            </span>
            <div className="text-[9px] font-mono-tech text-[#ff4d6d] font-bold tracking-widest mt-0.5">
              {currentTrack.sampleRate || 'LOSSLESS 96KHZ'}
            </div>
          </div>
          <div className="flex items-center gap-1 ml-1 shrink-0">
            <button
              onClick={() => onToggleLike(currentTrack.id)}
              className={`p-1 hover:scale-110 active:scale-90 transition-transform ${
                currentTrack.isLiked ? 'text-[#dc143c]' : 'text-white/40 hover:text-white'
              }`}
              title={currentTrack.isLiked ? 'Remover dos favoritos' : 'Favoritar'}
            >
              <Heart
                className={`w-5 h-5 ${currentTrack.isLiked ? 'fill-[#dc143c]' : ''}`}
              />
            </button>
            <button
              onClick={onOpenImageManager}
              className="text-white/40 hover:text-white transition-colors p-1"
              title="Ver / Copiar Link Direto da Imagem"
            >
              <Link2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* CENTER: Transport Controls & High-Velocity Timeline */}
        <div className="flex flex-col items-center max-w-[620px] w-2/4 px-2">
          {/* Buttons */}
          <div className="flex items-center gap-5 mb-1">
            <button
              onClick={onToggleShuffle}
              className={`p-1 relative active:scale-95 transition-colors ${
                isShuffle ? 'text-[#dc143c]' : 'text-white/50 hover:text-white'
              }`}
              title={isShuffle ? 'Aleatório: Ativado' : 'Aleatório: Desativado'}
            >
              <Shuffle className="w-4 h-4" />
              {isShuffle && (
                <span className="w-1 h-1 rounded-full bg-[#dc143c] absolute bottom-0 left-1/2 -translate-x-1/2"></span>
              )}
            </button>

            <button
              onClick={onPrevTrack}
              className="text-white/70 hover:text-white transition-colors active:scale-95 p-1"
              title="Faixa Anterior"
            >
              <SkipBack className="w-5 h-5" />
            </button>

            {/* Center Kinetic Play/Pause Ring Button */}
            <button
              onClick={onTogglePlay}
              className="w-10 h-10 bg-[#dc143c] hover:bg-red-600 text-white flex items-center justify-center transition-all shadow-[0_0_20px_rgba(220,20,60,0.6)] hover:scale-105 active:scale-95 clip-corner"
              title={isPlaying ? 'Pausar' : 'Reproduzir'}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 fill-current" />
              ) : (
                <Play className="w-5 h-5 fill-current" />
              )}
            </button>

            <button
              onClick={onNextTrack}
              className="text-white/70 hover:text-white transition-colors active:scale-95 p-1"
              title="Próxima Faixa"
            >
              <SkipForward className="w-5 h-5" />
            </button>

            <button
              onClick={onToggleRepeat}
              className={`p-1 relative active:scale-95 transition-colors ${
                isRepeat ? 'text-[#dc143c]' : 'text-white/50 hover:text-white'
              }`}
              title={isRepeat ? 'Repetir: Ativado' : 'Repetir: Desativado'}
            >
              <Repeat className="w-4 h-4" />
              {isRepeat && (
                <span className="w-1 h-1 rounded-full bg-[#dc143c] absolute bottom-0 left-1/2 -translate-x-1/2"></span>
              )}
            </button>
          </div>

          {/* Timeline Scrubber with Tachometer Look */}
          <div className="w-full flex items-center gap-2">
            <span className="font-mono-tech text-[10px] text-white/50 text-right min-w-[32px]">
              {formatTime(currentTime)}
            </span>
            <div
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const ratio = Math.max(0, Math.min(1, clickX / rect.width));
                onSeek(ratio * duration);
              }}
              className="flex-1 h-3 flex items-center cursor-pointer group relative"
            >
              <div className="w-full h-[3px] bg-white/10 group-hover:h-1.5 transition-all overflow-hidden relative">
                {/* Crimson Elapsed Progress */}
                <div
                  className="h-full bg-[#dc143c] relative"
                  style={{ width: `${progressPercent}%` }}
                >
                  <div className="absolute right-0 top-0 bottom-0 w-2 bg-white shadow-[0_0_8px_white]"></div>
                </div>
              </div>
            </div>
            <span className="font-mono-tech text-[10px] text-white/50 min-w-[32px]">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* RIGHT: Telemetry Audio Controls */}
        <div className="flex items-center justify-end gap-3 w-1/4 min-w-[220px]">
          {/* Animated telemetry audio waves */}
          <div className="hidden lg:flex items-center gap-1 px-2.5 py-1 bg-white/5 border border-white/10 font-mono-tech text-[9px] text-white/70">
            <span>EQ ACTIVE</span>
            <div className="flex items-end gap-0.5 h-3 ml-1">
              <span className={`w-0.5 bg-[#dc143c] ${isPlaying ? 'eq-bar-1' : 'h-1'}`}></span>
              <span className={`w-0.5 bg-white ${isPlaying ? 'eq-bar-2' : 'h-2'}`}></span>
              <span className={`w-0.5 bg-[#dc143c] ${isPlaying ? 'eq-bar-3' : 'h-1'}`}></span>
              <span className={`w-0.5 bg-[#ffe600] ${isPlaying ? 'eq-bar-4' : 'h-2'}`}></span>
            </div>
          </div>

          <button
            onClick={onOpenLyrics}
            className="text-white/60 hover:text-white transition-colors p-1"
            title="Letras"
          >
            <Mic2 className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenQueue}
            className="text-white/60 hover:text-white transition-colors p-1"
            title="Fila de reprodução"
          >
            <ListMusic className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenDevices}
            className="text-white/60 hover:text-white transition-colors p-1"
            title="Output Dispositivo"
          >
            <Laptop className="w-4 h-4" />
          </button>

          {/* Volume Bar */}
          <div className="flex items-center gap-1.5 group">
            <button
              onClick={() => onChangeVolume(volume === 0 ? 0.8 : 0)}
              className="text-white/60 group-hover:text-white transition-colors p-1"
              title="Volume"
            >
              {volume === 0 ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>
            <div
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const ratio = Math.max(0, Math.min(1, clickX / rect.width));
                onChangeVolume(ratio);
              }}
              className="w-20 h-3 flex items-center cursor-pointer"
            >
              <div className="w-full h-[3px] bg-white/10 group-hover:h-1 transition-all relative">
                <div
                  className="h-full bg-[#dc143c]"
                  style={{ width: `${volume * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          <button
            onClick={toggleFullscreen}
            className="text-white/60 hover:text-white transition-colors p-1"
            title={isFullscreen ? 'Sair da tela cheia' : 'Tela cheia'}
          >
            {isFullscreen ? (
              <Minimize2 className="w-4 h-4" />
            ) : (
              <Maximize2 className="w-4 h-4" />
            )}
          </button>
        </div>
      </footer>
    </div>
  );
};
