import React from 'react';
import { ListMusic, Play, X, Zap } from 'lucide-react';
import { Track } from '../types';

interface QueueModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTrack: Track;
  tracks: Track[];
  onSelectTrack: (track: Track) => void;
}

export const QueueModal: React.FC<QueueModalProps> = ({
  isOpen,
  onClose,
  currentTrack,
  tracks,
  onSelectTrack,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-[#121217] border border-white/15 w-full max-w-lg max-h-[80vh] flex flex-col clip-corner shadow-[0_0_40px_rgba(220,20,60,0.3)]">
        <div className="p-4 border-b border-white/10 flex items-center justify-between bg-black/40">
          <div className="flex items-center gap-2">
            <ListMusic className="w-5 h-5 text-[#dc143c]" />
            <h3 className="text-white font-kinetic font-black uppercase text-sm">
              Fila de Telemetria e Próximas Faixas
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 bg-white/5 hover:bg-[#dc143c] text-white flex items-center justify-center clip-tag"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 space-y-4 flex-1 overflow-y-auto custom-scrollbar">
          <div>
            <div className="text-[10px] font-mono-tech text-[#ffe600] uppercase font-bold tracking-widest mb-1.5 flex items-center gap-1">
              <Zap className="w-3 h-3" /> EM REPRODUÇÃO AGORA
            </div>
            <div className="p-2.5 bg-[#dc143c]/15 border border-[#dc143c]/50 flex items-center gap-3">
              <img
                src={currentTrack.coverUrl}
                alt={currentTrack.title}
                className="w-12 h-12 object-cover shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="text-white font-kinetic font-bold text-xs truncate">
                  {currentTrack.title}
                </div>
                <div className="text-white/60 text-[11px] font-mono-tech truncate">
                  {currentTrack.artist}
                </div>
                <div className="text-[9px] font-mono-tech text-[#dc143c] font-bold mt-0.5">
                  {currentTrack.sampleRate} • {currentTrack.bpm} BPM
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="text-[10px] font-mono-tech text-white/50 uppercase font-bold tracking-widest mb-2">
              A SEGUIR NA SESSÃO ({tracks.length - 1} FAIXAS)
            </div>
            <div className="space-y-1.5">
              {tracks
                .filter((t) => t.id !== currentTrack.id)
                .map((track, idx) => (
                  <div
                    key={track.id}
                    onClick={() => {
                      onSelectTrack(track);
                      onClose();
                    }}
                    className="flex items-center gap-3 p-2 bg-white/[0.02] hover:bg-white/5 border border-white/5 transition-all cursor-pointer group"
                  >
                    <span className="w-5 text-center font-mono-tech text-xs text-white/40">
                      {(idx + 2).toString().padStart(2, '0')}
                    </span>
                    <img
                      src={track.coverUrl}
                      alt={track.title}
                      className="w-10 h-10 object-cover shrink-0 grayscale group-hover:grayscale-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-white font-kinetic font-bold text-xs truncate group-hover:text-[#ff4d6d]">
                        {track.title}
                      </div>
                      <div className="text-white/50 text-[11px] font-mono-tech truncate">
                        {track.artist}
                      </div>
                    </div>
                    <span className="text-[10px] font-mono-tech text-white/40">
                      {track.bpm ? `${track.bpm} BPM` : '96KHZ'}
                    </span>
                    <button className="w-8 h-8 bg-[#dc143c] text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity clip-tag">
                      <Play className="w-4 h-4 fill-white" />
                    </button>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
