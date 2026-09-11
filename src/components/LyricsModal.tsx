import React from 'react';
import { Mic2, X, Activity } from 'lucide-react';
import { Track } from '../types';

interface LyricsModalProps {
  isOpen: boolean;
  onClose: () => void;
  track: Track;
  currentTime: number;
}

export const LyricsModal: React.FC<LyricsModalProps> = ({
  isOpen,
  onClose,
  track,
  currentTime,
}) => {
  if (!isOpen) return null;

  const sampleLyrics = [
    { time: 0, text: "I'm tryna put you in the worst mood, ah" },
    { time: 15, text: "P1 cleaner than your church shoes, ah" },
    { time: 28, text: "Milli point two just to hurt you, ah" },
    { time: 42, text: "All red Lamb' just to tease you, ah" },
    { time: 55, text: "None of these toys on lease too, ah" },
    { time: 68, text: "Made your whole year in a week too, yah" },
    { time: 82, text: "Main bitch out your league too, ah" },
    { time: 95, text: "Side bitch out of your league too, ah" },
    { time: 110, text: "Look what you've done" },
    { time: 122, text: "I'm a motherfuckin' starboy" },
    { time: 135, text: "Look what you've done" },
    { time: 148, text: "I'm a motherfuckin' starboy" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-lg">
      <div className="bg-[#121217] border border-white/15 w-full max-w-xl max-h-[85vh] flex flex-col clip-corner shadow-[0_0_50px_rgba(220,20,60,0.35)]">
        <div className="p-4 border-b border-white/10 flex items-center justify-between bg-black/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#dc143c] flex items-center justify-center text-white clip-corner">
              <Mic2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-white font-kinetic font-black uppercase text-sm">
                Telemetria Lírica // Letras Sincronizadas
              </h3>
              <p className="text-[11px] font-mono-tech text-white/50">
                {track.title} • {track.artist}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 bg-white/5 hover:bg-[#dc143c] text-white flex items-center justify-center clip-tag"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 flex-1 overflow-y-auto custom-scrollbar space-y-6 text-center">
          {sampleLyrics.map((line, idx) => {
            const isPassed = currentTime >= line.time;
            const isCurrent =
              currentTime >= line.time &&
              (idx === sampleLyrics.length - 1 || currentTime < sampleLyrics[idx + 1].time);

            return (
              <p
                key={idx}
                className={`text-lg md:text-xl font-kinetic font-bold transition-all duration-300 ${
                  isCurrent
                    ? 'text-[#ffe600] scale-105 drop-shadow-[0_0_12px_rgba(255,230,0,0.5)]'
                    : isPassed
                    ? 'text-white/80'
                    : 'text-white/30'
                }`}
              >
                {line.text}
              </p>
            );
          })}
        </div>

        <div className="p-3 bg-black/60 border-t border-white/10 flex items-center justify-between font-mono-tech text-[10px] text-white/50 px-4">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <Activity className="w-3.5 h-3.5 animate-pulse" /> SYNC: APEX LOSSLESS
          </span>
          <span className="text-[#dc143c] font-bold">CIRCUIT TIMECODE: {Math.floor(currentTime)}S</span>
        </div>
      </div>
    </div>
  );
};
