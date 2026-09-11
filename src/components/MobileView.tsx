import React, { useState } from 'react';
import {
  Play,
  Pause,
  Heart,
  MoreVertical,
  Bell,
  Sliders,
  Home,
  Search,
  Library,
  Laptop,
  Bookmark,
  Zap,
  Radio,
  ExternalLink,
  Link2,
  Check
} from 'lucide-react';
import { Track, Playlist, CategoryFilter, ActiveTab } from '../types';
import { TelemetryMarquee } from './TelemetryMarquee';
import { audioEngine } from '../utils/audioEngine';

interface MobileViewProps {
  tracks: Track[];
  playlists: Playlist[];
  currentTrack: Track;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  activeCategory: CategoryFilter;
  activeTab: ActiveTab;
  driverPortrait: string;
  onTogglePlay: () => void;
  onToggleLike: (trackId: string) => void;
  onSelectTrack: (track: Track) => void;
  onSelectCategory: (cat: CategoryFilter) => void;
  onSelectTab: (tab: ActiveTab) => void;
  onOpenImageManager: () => void;
  onStartSpeedSession: () => void;
  onOpenSearch: () => void;
  onOpenQueue: () => void;
  onOpenLyrics: () => void;
  onOpenDevices: () => void;
}

export const MobileView: React.FC<MobileViewProps> = ({
  tracks,
  playlists,
  currentTrack,
  isPlaying,
  currentTime,
  duration,
  activeCategory,
  activeTab,
  driverPortrait,
  onTogglePlay,
  onToggleLike,
  onSelectTrack,
  onSelectCategory,
  onSelectTab,
  onOpenImageManager,
  onStartSpeedSession,
  onOpenSearch,
  onOpenQueue,
  onOpenLyrics,
  onOpenDevices,
}) => {
  const [bookmarked, setBookmarked] = useState(false);
  const [sessionActive, setSessionActive] = useState(false);

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleStartSession = () => {
    setSessionActive(true);
    audioEngine.playSessionChime();
    onStartSpeedSession();
    setTimeout(() => setSessionActive(false), 3000);
  };

  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-[#0b0b0d] text-[#e5e2e1] flex flex-col relative select-none pb-40">
      {/* 1. LIVE TELEMETRY TICKER */}
      <TelemetryMarquee isCompact={true} bpm={currentTrack.bpm || 174} />

      {/* 2. TOP APP BAR */}
      <header className="sticky top-0 z-40 w-full bg-[#131313]/90 backdrop-blur-md px-4 py-2.5 shadow-sm flex items-center justify-between border-b border-white/5">
        <div className="flex items-center gap-3">
          {/* Leading Avatar Driver #04 */}
          <div
            onClick={onOpenImageManager}
            className="relative w-11 h-11 rounded-lg overflow-hidden border-2 border-[#dc143c] bg-[#2a2a2a] shrink-0 cursor-pointer"
            title="Clique para ver ou trocar URLs diretos"
          >
            <img
              src={driverPortrait}
              alt="Lando Norris #04"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 inset-x-0 bg-[#dc143c] text-white text-[9px] font-mono-tech font-bold text-center tracking-tighter">
              #04
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-bold text-[#e5e2e1] tracking-tight font-kinetic">
                Início
              </span>
              <span className="px-1.5 py-0.5 rounded bg-[#dc143c]/20 text-[#ffb3b3] font-mono-tech text-[10px] uppercase font-bold tracking-wider">
                AURA×LN
              </span>
            </div>
            <div className="text-[11px] font-mono-tech text-[#ac8888] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              DAC 96KHZ READY
            </div>
          </div>
        </div>

        {/* Trailing Actions */}
        <div className="flex items-center gap-1">
          <button
            onClick={onOpenImageManager}
            className="w-10 h-10 rounded-lg flex items-center justify-center text-[#e6bdbc] hover:text-[#dc143c] active:scale-95 transition-all"
            title="Links de Imagem"
          >
            <Link2 className="w-5 h-5 text-[#dc143c]" />
          </button>
          <button
            onClick={() => alert('Notificação Paddock: Circuito Interlagos conectado em tempo real.')}
            aria-label="Notificações"
            className="w-10 h-10 rounded-lg flex items-center justify-center text-[#e6bdbc] hover:text-[#dc143c] active:scale-95 transition-all relative"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#dc143c] ring-2 ring-[#131313]"></span>
          </button>
          <button
            onClick={onOpenDevices}
            aria-label="Configurações de Áudio"
            className="w-10 h-10 rounded-lg flex items-center justify-center text-[#e6bdbc] hover:text-[#dc143c] active:scale-95 transition-all"
          >
            <Sliders className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Content Sections */}
      <main className="px-4 space-y-6 pt-3">
        {/* 3. TELEMETRY HORIZONTAL CHIP FILTER */}
        <section
          aria-label="Filtros de conteúdo"
          className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 -mx-4 px-4"
        >
          <button
            onClick={() => onSelectCategory('all')}
            className={`h-9 px-4 rounded-full font-kinetic text-xs font-bold shrink-0 flex items-center gap-1.5 transition-transform active:scale-95 ${
              activeCategory === 'all'
                ? 'bg-[#dc143c] text-white shadow-[0_0_12px_rgba(220,20,60,0.4)]'
                : 'bg-[#2a2a2a] text-[#e5e2e1] hover:bg-[#393939] border border-white/5'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
            TUDO // ALL
          </button>
          <button
            onClick={() => onSelectCategory('musica')}
            className={`h-9 px-4 rounded-full font-kinetic text-xs shrink-0 active:scale-95 transition-all border border-white/5 ${
              activeCategory === 'musica'
                ? 'bg-[#dc143c] text-white font-bold'
                : 'bg-[#2a2a2a] text-[#e5e2e1] hover:bg-[#393939]'
            }`}
          >
            MÚSICA
          </button>
          <button
            onClick={() => onSelectCategory('podcasts')}
            className={`h-9 px-4 rounded-full font-kinetic text-xs shrink-0 active:scale-95 transition-all border border-white/5 ${
              activeCategory === 'podcasts'
                ? 'bg-[#dc143c] text-white font-bold'
                : 'bg-[#2a2a2a] text-[#e5e2e1] hover:bg-[#393939]'
            }`}
          >
            PODCASTS
          </button>
          <button
            onClick={() => onSelectCategory('paddock')}
            className={`h-9 px-4 rounded-full font-kinetic text-xs shrink-0 active:scale-95 transition-all border border-white/5 flex items-center gap-1 ${
              activeCategory === 'paddock'
                ? 'bg-[#dc143c] text-white font-bold'
                : 'bg-[#2a2a2a] text-[#e5e2e1] hover:bg-[#393939]'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-[#dc143c]" />
            PADDOCK AUDIO
          </button>
          <button
            onClick={() => onSelectCategory('pitlane')}
            className={`h-9 px-4 rounded-full font-kinetic text-xs shrink-0 active:scale-95 transition-all border border-white/5 ${
              activeCategory === 'pitlane'
                ? 'bg-[#dc143c] text-white font-bold'
                : 'bg-[#2a2a2a] text-[#e5e2e1] hover:bg-[#393939]'
            }`}
          >
            PIT LANE AMBIENCE
          </button>
        </section>

        {/* 4. HERO CARD CINÉTICO // HIGH OCTANE PERFORMANCE */}
        <section className="relative rounded-xl overflow-hidden bg-gradient-to-br from-[#1c1b1b] via-[#201f1f] to-[#0e0e0e] border border-white/10 shadow-2xl diagonal-lines p-5">
          {/* Decorative glows */}
          <div className="absolute -right-16 -top-16 w-48 h-48 bg-[#dc143c]/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -left-10 -bottom-10 w-36 h-36 bg-[#ccff00]/10 rounded-full blur-2xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-[#dc143c] text-white font-mono-tech text-[10px] font-bold uppercase tracking-wider">
                  SESSION #04 ACTIVE
                </span>
                <span className="text-[#ac8888] text-[11px] font-mono-tech">
                  CIRCUITO INTERLAGOS
                </span>
              </div>
              <span className="text-[#ccff00] font-mono-tech text-[11px] font-bold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#ccff00] animate-ping"></span>
                174 BPM ELEVATED
              </span>
            </div>

            <div>
              <div className="text-[#ac8888] font-mono-tech text-[11px] tracking-widest uppercase mb-1">
                TUNED ACOUSTIC KINETICS
              </div>
              <h2 className="text-3xl font-extrabold text-[#e5e2e1] tracking-tighter leading-none font-kinetic">
                HIGH VELOCITY <br />
                <span className="text-[#dc143c]">ACOUSTICS</span>
              </h2>
              <p className="text-xs text-[#ac8888] mt-2 line-clamp-2">
                Frequências sonoras calculadas em túnel de vento para aceleração de foco e tempo de reação milimétrico...
              </p>
            </div>

            <div className="pt-2 flex items-center justify-between gap-3">
              <button
                onClick={handleStartSession}
                className={`flex-1 h-12 rounded-lg font-kinetic text-sm font-bold flex items-center justify-center gap-2 shadow-[0_8px_16px_rgba(220,20,60,0.4)] active:scale-98 transition-all ${
                  sessionActive
                    ? 'bg-emerald-500 text-black'
                    : 'bg-[#dc143c] hover:bg-[#dc143c]/90 text-white'
                }`}
              >
                <Play className="w-4 h-4 fill-current" />
                <span>{sessionActive ? 'SESSÃO INICIADA!' : 'INICIAR SESSÃO VELOCIDADE'}</span>
              </button>
              <button
                onClick={() => setBookmarked(!bookmarked)}
                aria-label="Salvar Sessão"
                className={`w-12 h-12 rounded-lg flex items-center justify-center border border-white/10 active:scale-95 transition-all ${
                  bookmarked
                    ? 'bg-[#dc143c] text-white'
                    : 'bg-[#353534]/80 hover:bg-[#393939] text-[#e5e2e1]'
                }`}
              >
                <Bookmark className={`w-5 h-5 ${bookmarked ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>
        </section>

        {/* 5. GRADE DE ACESSO RÁPIDO (2 COLUNAS ERGONÔMICA) */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-bold text-[#e5e2e1] flex items-center gap-2 font-kinetic">
              <span className="w-1.5 h-4 bg-[#dc143c] rounded-full"></span>
              Acesso Imediato
            </h3>
            <span className="font-mono-tech text-[11px] text-[#ac8888]">PINNED_V4</span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {/* Item 1: Músicas Curtidas */}
            <div
              onClick={() => onSelectTrack(tracks[0])}
              className="h-16 bg-[#1c1b1b] hover:bg-[#2a2a2a] border border-white/5 rounded-lg flex items-center overflow-hidden active:scale-98 transition-all group cursor-pointer shadow-sm"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-[#dc143c] to-[#ac0037] flex items-center justify-center shrink-0 text-white shadow-inner">
                <Heart className="w-6 h-6 fill-white" />
              </div>
              <div className="px-3 min-w-0 flex-1">
                <div className="text-xs font-bold text-[#e5e2e1] truncate group-hover:text-[#ffb3b3] transition-colors font-kinetic">
                  Músicas Curtidas
                </div>
                <div className="font-mono-tech text-[#ac8888] text-[10px] truncate">
                  1.428 FAIXAS
                </div>
              </div>
            </div>

            {/* Item 2: Daily Mix 01 */}
            <div
              onClick={() => onSelectTrack(tracks[1])}
              className="h-16 bg-[#1c1b1b] hover:bg-[#2a2a2a] border border-white/5 rounded-lg flex items-center overflow-hidden active:scale-98 transition-all group cursor-pointer shadow-sm"
            >
              <div className="w-16 h-16 bg-[#353534] relative shrink-0">
                <img
                  src={playlists[3].coverUrl}
                  alt="Daily Mix 01"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-[#dc143c]/10"></div>
              </div>
              <div className="px-3 min-w-0 flex-1">
                <div className="text-xs font-bold text-[#e5e2e1] truncate group-hover:text-[#ffb3b3] transition-colors font-kinetic">
                  Daily Mix 01
                </div>
                <div className="font-mono-tech text-[#ac8888] text-[10px] truncate">
                  OVERDRIVE TECH
                </div>
              </div>
            </div>

            {/* Item 3: Top Brasil Circuito */}
            <div
              onClick={() => onSelectTrack(tracks[2])}
              className="h-16 bg-[#1c1b1b] hover:bg-[#2a2a2a] border border-white/5 rounded-lg flex items-center overflow-hidden active:scale-98 transition-all group cursor-pointer shadow-sm"
            >
              <div className="w-16 h-16 bg-[#353534] relative shrink-0">
                <img
                  src={playlists[2].coverUrl}
                  alt="Top Brasil"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="px-3 min-w-0 flex-1">
                <div className="text-xs font-bold text-[#e5e2e1] truncate group-hover:text-[#ffb3b3] transition-colors font-kinetic">
                  Top Brasil
                </div>
                <div className="font-mono-tech text-[#ac8888] text-[10px] truncate">
                  CIRCUITO 50
                </div>
              </div>
            </div>

            {/* Item 4: Radar Telemetria */}
            <div
              onClick={() => onSelectTrack(tracks[3])}
              className="h-16 bg-[#1c1b1b] hover:bg-[#2a2a2a] border border-white/5 rounded-lg flex items-center overflow-hidden active:scale-98 transition-all group cursor-pointer shadow-sm"
            >
              <div className="w-16 h-16 bg-black relative shrink-0 flex items-center justify-center">
                <Radio className="w-7 h-7 text-[#ccff00]" />
              </div>
              <div className="px-3 min-w-0 flex-1">
                <div className="text-xs font-bold text-[#e5e2e1] truncate group-hover:text-[#ffb3b3] transition-colors font-kinetic">
                  Radar F1 Mix
                </div>
                <div className="font-mono-tech text-[#ac8888] text-[10px] truncate">
                  ATUALIZADO HOJE
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. SEÇÃO DE PLAYLISTS EM DESTAQUE (CARROSSEL HORIZONTAL KINÉTICO) */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-lg font-bold text-[#e5e2e1] font-kinetic">Curadoria Paddock</h3>
              <p className="text-xs text-[#ac8888]">
                Mixes de alta concentração e recuperação muscular
              </p>
            </div>
            <button
              onClick={onOpenQueue}
              className="text-xs text-[#ffb3b3] hover:underline font-bold"
            >
              Ver tudo
            </button>
          </div>

          <div className="flex gap-4 overflow-x-auto no-scrollbar -mx-4 px-4 pb-2">
            {/* Card 1: Apex Overtake */}
            <div
              onClick={() => onSelectTrack(tracks[3])}
              className="w-[156px] shrink-0 bg-[#1c1b1b] rounded-lg p-3 border border-white/5 hover:bg-[#2a2a2a] active:scale-95 transition-all group cursor-pointer"
            >
              <div className="relative aspect-square rounded-md overflow-hidden bg-[#353534] mb-2.5 shadow-md">
                <img
                  src={tracks[3].coverUrl}
                  alt="Apex Overtake"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 right-2 w-9 h-9 rounded-full bg-[#dc143c] text-white flex items-center justify-center shadow-lg shadow-[#dc143c]/50">
                  <Play className="w-4 h-4 fill-white" />
                </div>
                <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-md px-1.5 py-0.5 rounded text-[9px] font-mono-tech text-[#e5e2e1]">
                  180 BPM
                </div>
              </div>
              <div className="text-xs font-bold text-[#e5e2e1] truncate font-kinetic">
                APEX OVERTAKE
              </div>
              <div className="text-[11px] text-[#ac8888] line-clamp-1 mt-0.5">
                Drum & Bass, Synthwave
              </div>
            </div>

            {/* Card 2: Starboy Sessions */}
            <div
              onClick={() => onSelectTrack(tracks[0])}
              className="w-[156px] shrink-0 bg-[#1c1b1b] rounded-lg p-3 border border-white/5 hover:bg-[#2a2a2a] active:scale-95 transition-all group cursor-pointer"
            >
              <div className="relative aspect-square rounded-md overflow-hidden bg-[#353534] mb-2.5 shadow-md">
                <img
                  src={tracks[0].coverUrl}
                  alt="Starboy"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 right-2 w-9 h-9 rounded-full bg-[#dc143c] text-white flex items-center justify-center shadow-lg shadow-[#dc143c]/50">
                  <Play className="w-4 h-4 fill-white" />
                </div>
                <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-md px-1.5 py-0.5 rounded text-[9px] font-mono-tech text-[#ccff00]">
                  DELUXE
                </div>
              </div>
              <div className="text-xs font-bold text-[#e5e2e1] truncate font-kinetic">
                STARBOY SESSIONS
              </div>
              <div className="text-[11px] text-[#ac8888] line-clamp-1 mt-0.5">
                The Weeknd, Daft Punk
              </div>
            </div>

            {/* Card 3: Rock Apex Speed */}
            <div
              onClick={() => onSelectTrack(tracks[5])}
              className="w-[156px] shrink-0 bg-[#1c1b1b] rounded-lg p-3 border border-white/5 hover:bg-[#2a2a2a] active:scale-95 transition-all group cursor-pointer"
            >
              <div className="relative aspect-square rounded-md overflow-hidden bg-[#353534] mb-2.5 shadow-md">
                <img
                  src={tracks[5].coverUrl}
                  alt="Rock Apex"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 right-2 w-9 h-9 rounded-full bg-[#dc143c] text-white flex items-center justify-center shadow-lg shadow-[#dc143c]/50">
                  <Play className="w-4 h-4 fill-white" />
                </div>
                <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-md px-1.5 py-0.5 rounded text-[9px] font-mono-tech text-[#e5e2e1]">
                  QUALY
                </div>
              </div>
              <div className="text-xs font-bold text-[#e5e2e1] truncate font-kinetic">
                ROCK APEX SPEED
              </div>
              <div className="text-[11px] text-[#ac8888] line-clamp-1 mt-0.5">
                Muse, Royal Blood, Arctic
              </div>
            </div>

            {/* Card 4: Cool Down Pit */}
            <div
              onClick={() => onSelectTrack(tracks[6])}
              className="w-[156px] shrink-0 bg-[#1c1b1b] rounded-lg p-3 border border-white/5 hover:bg-[#2a2a2a] active:scale-95 transition-all group cursor-pointer"
            >
              <div className="relative aspect-square rounded-md overflow-hidden bg-[#353534] mb-2.5 shadow-md">
                <img
                  src={tracks[6].coverUrl}
                  alt="Cool Down"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 right-2 w-9 h-9 rounded-full bg-[#dc143c] text-white flex items-center justify-center shadow-lg shadow-[#dc143c]/50">
                  <Play className="w-4 h-4 fill-white" />
                </div>
                <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-md px-1.5 py-0.5 rounded text-[9px] font-mono-tech text-[#e5e2e1]">
                  RECOVERY
                </div>
              </div>
              <div className="text-xs font-bold text-[#e5e2e1] truncate font-kinetic">
                COOL DOWN // PIT
              </div>
              <div className="text-[11px] text-[#ac8888] line-clamp-1 mt-0.5">
                Lo-fi, Ambient Paddock
              </div>
            </div>
          </div>
        </section>

        {/* 7. SEÇÃO TELEMETRY TRACK LIST (RECENTEMENTE TOCADAS) */}
        <section className="space-y-2 pb-6">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-lg font-bold text-[#e5e2e1] font-kinetic">
              Faixas em Telemetria
            </h3>
            <span className="text-[11px] text-[#5c3f3f] font-mono-tech">96.0 KHZ STREAM</span>
          </div>

          {/* Track Row 1 (Tocando agora) */}
          <div
            onClick={() => onSelectTrack(tracks[0])}
            className="flex items-center justify-between p-2 rounded-lg bg-[#2a2a2a]/60 border border-[#dc143c]/30 active:scale-98 transition-all cursor-pointer"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-6 flex items-center justify-center shrink-0">
                {/* Dynamic Crimson Audio Equalizer */}
                <div className="flex items-end gap-[2px] h-4">
                  <span className={`w-[3px] bg-[#dc143c] rounded-t-sm ${isPlaying ? 'eq-bar-1' : 'h-1'}`}></span>
                  <span className={`w-[3px] bg-[#dc143c] rounded-t-sm ${isPlaying ? 'eq-bar-2' : 'h-2'}`}></span>
                  <span className={`w-[3px] bg-[#dc143c] rounded-t-sm ${isPlaying ? 'eq-bar-3' : 'h-1'}`}></span>
                  <span className={`w-[3px] bg-[#dc143c] rounded-t-sm ${isPlaying ? 'eq-bar-4' : 'h-3'}`}></span>
                </div>
              </div>
              <div className="w-10 h-10 rounded bg-[#353534] overflow-hidden shrink-0">
                <img
                  src={tracks[0].coverUrl}
                  alt={tracks[0].title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-[#dc143c] truncate flex items-center gap-1.5 font-kinetic">
                  {tracks[0].title}
                  <span className="text-[9px] font-mono-tech bg-[#dc143c]/20 text-[#ffb3b3] px-1 rounded">
                    MASTER
                  </span>
                </div>
                <div className="text-xs text-[#ac8888] truncate">{tracks[0].artist}</div>
              </div>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleLike(tracks[0].id);
                }}
                className="w-9 h-9 flex items-center justify-center text-[#dc143c] active:scale-90"
              >
                <Heart className="w-4 h-4 fill-[#dc143c]" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenImageManager();
                }}
                className="w-9 h-9 flex items-center justify-center text-[#ac8888]"
              >
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Track Row 2 */}
          <div
            onClick={() => onSelectTrack(tracks[1])}
            className="flex items-center justify-between p-2 rounded-lg hover:bg-[#2a2a2a] active:scale-98 transition-all border border-transparent cursor-pointer"
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className="w-6 text-center font-mono-tech text-xs text-[#ac8888] shrink-0">
                02
              </span>
              <div className="w-10 h-10 rounded bg-[#353534] overflow-hidden shrink-0">
                <img
                  src={tracks[1].coverUrl}
                  alt={tracks[1].title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-[#e5e2e1] truncate font-kinetic">
                  {tracks[1].title}
                </div>
                <div className="text-xs text-[#ac8888] truncate">{tracks[1].artist}</div>
              </div>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleLike(tracks[1].id);
                }}
                className={`w-9 h-9 flex items-center justify-center active:scale-90 ${
                  tracks[1].isLiked ? 'text-[#dc143c]' : 'text-[#ac8888]'
                }`}
              >
                <Heart className={`w-4 h-4 ${tracks[1].isLiked ? 'fill-[#dc143c]' : ''}`} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenImageManager();
                }}
                className="w-9 h-9 flex items-center justify-center text-[#ac8888]"
              >
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Track Row 3 */}
          <div
            onClick={() => onSelectTrack(tracks[2])}
            className="flex items-center justify-between p-2 rounded-lg hover:bg-[#2a2a2a] active:scale-98 transition-all border border-transparent cursor-pointer"
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className="w-6 text-center font-mono-tech text-xs text-[#ac8888] shrink-0">
                03
              </span>
              <div className="w-10 h-10 rounded bg-[#353534] overflow-hidden shrink-0">
                <img
                  src={tracks[2].coverUrl}
                  alt={tracks[2].title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-[#e5e2e1] truncate font-kinetic">
                  {tracks[2].title}
                </div>
                <div className="text-xs text-[#ac8888] truncate">{tracks[2].artist}</div>
              </div>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleLike(tracks[2].id);
                }}
                className={`w-9 h-9 flex items-center justify-center active:scale-90 ${
                  tracks[2].isLiked ? 'text-[#dc143c]' : 'text-[#ac8888]'
                }`}
              >
                <Heart className={`w-4 h-4 ${tracks[2].isLiked ? 'fill-[#dc143c]' : ''}`} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenImageManager();
                }}
                className="w-9 h-9 flex items-center justify-center text-[#ac8888]"
              >
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* 8. MINI-PLAYER FLUTUANTE // STICKY ERGONÔMICO (Above Bottom Nav) */}
      <div className="fixed bottom-[68px] inset-x-2 z-40 max-w-md mx-auto">
        <div className="bg-[#2a2a2a]/95 backdrop-blur-xl border border-white/10 rounded-xl p-2.5 shadow-[0_12px_32px_rgba(0,0,0,0.8)] relative overflow-hidden flex items-center justify-between gap-3">
          {/* Top continuous 2px progress bar (Crimson) */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#353534]">
            <div
              className="h-full bg-[#dc143c] rounded-r-full relative transition-all"
              style={{ width: `${progressPercent}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#dc143c]"></div>
            </div>
          </div>

          {/* Track Thumbnail + Titles */}
          <div
            onClick={onOpenLyrics}
            className="flex items-center gap-2.5 min-w-0 flex-1 pt-0.5 cursor-pointer"
          >
            <div className="relative w-11 h-11 rounded-lg overflow-hidden shrink-0 border border-white/10">
              <img
                src={currentTrack.coverUrl}
                alt={currentTrack.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-[#e5e2e1] truncate font-kinetic">
                  {currentTrack.title}
                </span>
                {isPlaying && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#dc143c] animate-pulse"></span>
                )}
              </div>
              <div className="text-[11px] text-[#ac8888] truncate">{currentTrack.artist}</div>
            </div>
          </div>

          {/* Quick Action Controls */}
          <div className="flex items-center gap-0.5 shrink-0 pt-0.5">
            <button
              onClick={onOpenDevices}
              aria-label="Dispositivo de Áudio"
              className="w-10 h-10 rounded-lg flex items-center justify-center text-[#ac8888] hover:text-[#e5e2e1] active:scale-90 transition-all"
            >
              <Laptop className="w-4 h-4" />
            </button>
            <button
              onClick={() => onToggleLike(currentTrack.id)}
              aria-label="Favoritar"
              className={`w-10 h-10 rounded-lg flex items-center justify-center active:scale-90 transition-all ${
                currentTrack.isLiked ? 'text-[#dc143c]' : 'text-[#ac8888]'
              }`}
            >
              <Heart
                className={`w-5 h-5 ${currentTrack.isLiked ? 'fill-[#dc143c]' : ''}`}
              />
            </button>

            {/* Primary Play/Pause Button in Signature Crimson */}
            <button
              onClick={onTogglePlay}
              aria-label="Pausar ou Reproduzir"
              className="w-11 h-11 rounded-full bg-[#dc143c] hover:bg-[#dc143c]/90 text-white flex items-center justify-center shadow-[0_4px_16px_rgba(220,20,60,0.5)] active:scale-90 transition-transform ml-1"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 fill-current" />
              ) : (
                <Play className="w-5 h-5 fill-current" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 9. BOTTOM NAVIGATION BAR */}
      <nav
        className="fixed bottom-0 left-0 right-0 max-w-md mx-auto z-50 flex justify-around items-center px-4 py-1 bg-[#0e0e0e]/95 backdrop-blur-lg shadow-lg border-t border-white/5"
        style={{ height: '64px' }}
      >
        {/* Tab 1: Início */}
        <button
          onClick={() => onSelectTab('inicio')}
          className={`flex flex-col items-center justify-center text-xs min-w-[64px] py-1 transition-colors active:scale-95 duration-150 ${
            activeTab === 'inicio' ? 'text-[#e5e2e1] font-bold' : 'text-[#ac8888]'
          }`}
        >
          <div className="relative flex items-center justify-center">
            <Home className="w-5 h-5" />
            {activeTab === 'inicio' && (
              <span className="absolute -top-1 right-0 w-1.5 h-1.5 rounded-full bg-[#dc143c]"></span>
            )}
          </div>
          <span className="mt-0.5 tracking-tight font-kinetic">Início</span>
        </button>

        {/* Tab 2: Buscar */}
        <button
          onClick={onOpenSearch}
          className={`flex flex-col items-center justify-center text-xs min-w-[64px] py-1 transition-colors active:scale-95 duration-150 ${
            activeTab === 'buscar' ? 'text-[#e5e2e1] font-bold' : 'text-[#ac8888]'
          }`}
        >
          <Search className="w-5 h-5" />
          <span className="mt-0.5 tracking-tight font-kinetic">Buscar</span>
        </button>

        {/* Tab 3: Sua Biblioteca */}
        <button
          onClick={() => onSelectTab('biblioteca')}
          className={`flex flex-col items-center justify-center text-xs min-w-[64px] py-1 transition-colors active:scale-95 duration-150 ${
            activeTab === 'biblioteca' ? 'text-[#e5e2e1] font-bold' : 'text-[#ac8888]'
          }`}
        >
          <Library className="w-5 h-5" />
          <span className="mt-0.5 tracking-tight font-kinetic">Sua Biblioteca</span>
        </button>
      </nav>
    </div>
  );
};
