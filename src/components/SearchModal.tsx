import React, { useState } from 'react';
import { Search, X, Play, Heart, Disc, Radio } from 'lucide-react';
import { Track, Playlist, Artist } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  tracks: Track[];
  playlists: Playlist[];
  artists: Artist[];
  onSelectTrack: (track: Track) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  tracks,
  playlists,
  artists,
  onSelectTrack,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filteredTracks = tracks.filter(
    (t) =>
      t.title.toLowerCase().includes(query.toLowerCase()) ||
      t.artist.toLowerCase().includes(query.toLowerCase())
  );

  const filteredPlaylists = playlists.filter((p) =>
    p.title.toLowerCase().includes(query.toLowerCase())
  );

  const filteredArtists = artists.filter((a) =>
    a.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-[#121217] border border-white/15 w-full max-w-xl max-h-[80vh] flex flex-col clip-corner shadow-[0_0_40px_rgba(220,20,60,0.3)]">
        {/* Header Search Bar */}
        <div className="p-4 border-b border-white/10 flex items-center gap-3 bg-black/40">
          <Search className="w-5 h-5 text-[#dc143c]" />
          <input
            type="text"
            autoFocus
            placeholder="Pesquisar faixas, artistas ou playlists telemétricas..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-white font-kinetic text-sm placeholder:text-white/40 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-white/40 hover:text-white text-xs font-mono-tech"
            >
              LIMPAR
            </button>
          )}
          <button
            onClick={onClose}
            className="w-7 h-7 bg-white/5 hover:bg-[#dc143c] text-white flex items-center justify-center clip-tag transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4">
          <div>
            <div className="text-[10px] font-mono-tech text-[#dc143c] uppercase font-bold tracking-wider mb-2">
              FAIXAS ({filteredTracks.length})
            </div>
            <div className="space-y-1.5">
              {filteredTracks.map((track) => (
                <div
                  key={track.id}
                  onClick={() => {
                    onSelectTrack(track);
                    onClose();
                  }}
                  className="flex items-center gap-3 p-2 bg-white/[0.02] hover:bg-[#dc143c]/20 border border-white/5 hover:border-[#dc143c]/40 transition-all cursor-pointer group"
                >
                  <img
                    src={track.coverUrl}
                    alt={track.title}
                    className="w-10 h-10 object-cover shrink-0 border border-white/10"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-white font-kinetic font-bold text-xs truncate group-hover:text-[#ff4d6d]">
                      {track.title}
                    </div>
                    <div className="text-white/50 text-[11px] font-mono-tech truncate">
                      {track.artist}
                    </div>
                  </div>
                  <span className="font-mono-tech text-[10px] text-white/40 px-2 py-0.5 border border-white/10">
                    {track.bpm ? `${track.bpm} BPM` : '96KHZ'}
                  </span>
                  <div className="w-8 h-8 bg-[#dc143c] text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity clip-tag">
                    <Play className="w-4 h-4 fill-white" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {filteredArtists.length > 0 && (
            <div>
              <div className="text-[10px] font-mono-tech text-[#ffe600] uppercase font-bold tracking-wider mb-2">
                ARTISTAS & PILOTOS
              </div>
              <div className="grid grid-cols-2 gap-2">
                {filteredArtists.map((artist) => (
                  <div
                    key={artist.id}
                    onClick={() => {
                      const matched = tracks.find((t) =>
                        t.artist.toLowerCase().includes(artist.name.toLowerCase())
                      );
                      if (matched) onSelectTrack(matched);
                      onClose();
                    }}
                    className="flex items-center gap-2.5 p-2 bg-white/[0.02] hover:bg-white/10 border border-white/5 cursor-pointer"
                  >
                    <img
                      src={artist.avatarUrl}
                      alt={artist.name}
                      className="w-9 h-9 rounded-full object-cover shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="text-white font-kinetic text-xs font-bold truncate">
                        {artist.name}
                      </div>
                      <div className="text-[#dc143c] font-mono-tech text-[9px]">
                        {artist.role}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
