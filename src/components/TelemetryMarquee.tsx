import React from 'react';
import { Activity } from 'lucide-react';

interface TelemetryMarqueeProps {
  bpm?: number;
  fastestLap?: string;
  isCompact?: boolean;
}

export const TelemetryMarquee: React.FC<TelemetryMarqueeProps> = ({
  bpm = 174,
  fastestLap = '01:21.046',
  isCompact = false,
}) => {
  if (isCompact) {
    return (
      <div className="w-full bg-[#050507] overflow-hidden border-b border-white/5 py-1.5 z-40 select-none">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-6 text-white/60 font-mono-tech text-[10px] uppercase tracking-widest">
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#dc143c] animate-ping"></span>
            <strong className="text-white">LIVE TELEMETRY</strong> // CIRCUIT AURA AUDIO ENGINE
          </span>
          <span className="text-[#3d3d4e]">::</span>
          <span>
            BPM: <strong className="text-[#dc143c] font-bold">{bpm} MAX</strong>
          </span>
          <span className="text-[#3d3d4e]">::</span>
          <span>
            AUDIO: <strong className="text-white">24-BIT / 96KHZ FLAC</strong>
          </span>
          <span className="text-[#3d3d4e]">::</span>
          <span>
            DRIVER: <span className="text-[#dc143c]">#04 LANDO EDITION</span>
          </span>
          <span className="text-[#3d3d4e]">::</span>
          <span>
            STATUS: <strong className="text-emerald-400 font-bold">OPTIMAL // APEX ACTIVE</strong>
          </span>
          <span className="text-[#3d3d4e]">::</span>

          {/* Seamless duplicate */}
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#dc143c]"></span>
            <strong className="text-white">LIVE TELEMETRY</strong> // CIRCUIT AURA AUDIO ENGINE
          </span>
          <span className="text-[#3d3d4e]">::</span>
          <span>
            BPM: <strong className="text-[#dc143c] font-bold">{bpm} MAX</strong>
          </span>
          <span className="text-[#3d3d4e]">::</span>
          <span>
            AUDIO: <strong className="text-white">24-BIT / 96KHZ FLAC</strong>
          </span>
          <span className="text-[#3d3d4e]">::</span>
          <span>
            DRIVER: <span className="text-[#dc143c]">#04 LANDO EDITION</span>
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="h-9 w-full bg-[#050507] border-y border-white/10 flex items-center overflow-hidden shrink-0 relative select-none z-30">
      {/* Left Badge */}
      <div className="absolute left-0 top-0 bottom-0 bg-[#dc143c] px-3.5 z-20 flex items-center gap-1.5 text-white font-mono-tech text-[11px] font-extrabold tracking-wider clip-corner">
        <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
        <span>LIVE TELEMETRY</span>
      </div>

      {/* Marquee ticker */}
      <div className="animate-marquee whitespace-nowrap text-white/80 font-mono-tech text-[11px] uppercase tracking-wide-tech pl-48 flex items-center">
        <span className="text-white font-black">AURA SPEED ENGINE V4.8</span>
        <span className="mx-4 text-[#dc143c] font-black">///</span>
        <span className="text-[#ffe600] font-bold">RPM / BPM: {bpm}</span>
        <span className="mx-4 text-[#dc143c] font-black">///</span>
        <span>LOSSLESS FREQUENCY 24-BIT / 96KHZ</span>
        <span className="mx-4 text-[#dc143c] font-black">///</span>
        <span className="text-white font-bold">PADDOCK SECTOR 01: GREEN FLAG</span>
        <span className="mx-4 text-[#dc143c] font-black">///</span>
        <span className="text-[#ff4d6d] font-bold">FASTEST LAP: {fastestLap}</span>
        <span className="mx-4 text-[#dc143c] font-black">///</span>
        <span>HIGH-OCTANE CURATED AUDIO BY AURA SOUND LABS</span>
        <span className="mx-4 text-[#dc143c] font-black">///</span>
        <span className="text-white font-black">AURA SPEED ENGINE V4.8</span>
        <span className="mx-4 text-[#dc143c] font-black">///</span>
        <span className="text-[#ffe600] font-bold">RPM / BPM: {bpm}</span>
        <span className="mx-4 text-[#dc143c] font-black">///</span>
        <span>LOSSLESS FREQUENCY 24-BIT / 96KHZ</span>
      </div>

      {/* Right Telemetry Badge */}
      <div className="absolute right-0 top-0 bottom-0 bg-[#050507] px-4 z-20 flex items-center gap-3 border-l border-white/10 font-mono-tech text-[11px]">
        <span className="text-[#dc143c] font-extrabold">STATUS: OPTIMAL</span>
        <span className="text-white/60">00:41:29</span>
      </div>
    </div>
  );
};
