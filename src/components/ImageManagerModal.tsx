import React, { useState } from 'react';
import { Link2, Copy, Check, ExternalLink, Image as ImageIcon, X, RefreshCw } from 'lucide-react';
import { Track, Playlist, Artist } from '../types';

interface ImageManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  tracks: Track[];
  playlists: Playlist[];
  artists: Artist[];
  driverPortrait: string;
  onUpdateTrackImage: (id: string, newUrl: string) => void;
  onUpdatePlaylistImage: (id: string, newUrl: string) => void;
  onUpdateArtistImage: (id: string, newUrl: string) => void;
  onUpdateDriverPortrait: (newUrl: string) => void;
}

export const ImageManagerModal: React.FC<ImageManagerModalProps> = ({
  isOpen,
  onClose,
  tracks,
  playlists,
  artists,
  driverPortrait,
  onUpdateTrackImage,
  onUpdatePlaylistImage,
  onUpdateArtistImage,
  onUpdateDriverPortrait,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [tempUrl, setTempUrl] = useState('');
  const [activeTab, setActiveTab] = useState<'tracks' | 'playlists' | 'artists' | 'profile'>('tracks');

  if (!isOpen) return null;

  const handleCopy = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSaveEdit = (type: 'track' | 'playlist' | 'artist' | 'profile', id: string) => {
    if (!tempUrl.trim()) return;
    if (type === 'track') onUpdateTrackImage(id, tempUrl.trim());
    if (type === 'playlist') onUpdatePlaylistImage(id, tempUrl.trim());
    if (type === 'artist') onUpdateArtistImage(id, tempUrl.trim());
    if (type === 'profile') onUpdateDriverPortrait(tempUrl.trim());
    setEditingId(null);
    setTempUrl('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-[#121216] border border-white/15 w-full max-w-2xl max-h-[85vh] flex flex-col clip-corner shadow-[0_0_50px_rgba(220,20,60,0.3)]">
        {/* Header */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between bg-black/50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#dc143c] flex items-center justify-center text-white clip-corner">
              <Link2 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-white font-kinetic font-black uppercase text-sm tracking-wide">
                Gerenciador de Links Diretos de Imagens
              </h2>
              <p className="text-[11px] font-mono-tech text-white/50">
                Visualize, copie ou substitua os URLs diretos do HTML em tempo real
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-white/5 hover:bg-[#dc143c] text-white/80 hover:text-white flex items-center justify-center transition-colors clip-tag"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Filters */}
        <div className="flex items-center gap-1 p-2 bg-[#09090c] border-b border-white/5 px-4">
          <button
            onClick={() => setActiveTab('tracks')}
            className={`px-3 py-1.5 font-kinetic text-xs uppercase font-bold clip-tag transition-all ${
              activeTab === 'tracks'
                ? 'bg-[#dc143c] text-white'
                : 'text-white/60 hover:text-white bg-white/5'
            }`}
          >
            Faixas ({tracks.length})
          </button>
          <button
            onClick={() => setActiveTab('playlists')}
            className={`px-3 py-1.5 font-kinetic text-xs uppercase font-bold clip-tag transition-all ${
              activeTab === 'playlists'
                ? 'bg-[#dc143c] text-white'
                : 'text-white/60 hover:text-white bg-white/5'
            }`}
          >
            Playlists ({playlists.length})
          </button>
          <button
            onClick={() => setActiveTab('artists')}
            className={`px-3 py-1.5 font-kinetic text-xs uppercase font-bold clip-tag transition-all ${
              activeTab === 'artists'
                ? 'bg-[#dc143c] text-white'
                : 'text-white/60 hover:text-white bg-white/5'
            }`}
          >
            Artistas ({artists.length})
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-3 py-1.5 font-kinetic text-xs uppercase font-bold clip-tag transition-all ${
              activeTab === 'profile'
                ? 'bg-[#dc143c] text-white'
                : 'text-white/60 hover:text-white bg-white/5'
            }`}
          >
            Piloto LN #04
          </button>
        </div>

        {/* List Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-3">
          {activeTab === 'tracks' &&
            tracks.map((track) => (
              <div
                key={track.id}
                className="flex items-center gap-3 p-2.5 bg-white/[0.03] border border-white/10 hover:border-[#dc143c]/50 transition-all"
              >
                <img
                  src={track.coverUrl}
                  alt={track.title}
                  className="w-12 h-12 object-cover shrink-0 border border-white/10"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-white font-kinetic font-bold text-xs truncate">
                    {track.title}
                  </div>
                  <div className="text-white/50 text-[11px] font-mono-tech truncate">
                    {track.artist}
                  </div>
                  <div className="text-[10px] text-white/40 font-mono-tech truncate mt-0.5 max-w-md">
                    {track.coverUrl}
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => handleCopy(track.id, track.coverUrl)}
                    className="px-2.5 py-1.5 bg-white/5 hover:bg-white/15 text-white/80 font-mono-tech text-[10px] flex items-center gap-1 border border-white/10 clip-tag transition-colors"
                    title="Copiar URL direto"
                  >
                    {copiedId === track.id ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">Copiado</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copiar</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => {
                      setEditingId(editingId === track.id ? null : track.id);
                      setTempUrl(track.coverUrl);
                    }}
                    className="px-2.5 py-1.5 bg-white/5 hover:bg-[#dc143c] text-white font-mono-tech text-[10px] flex items-center gap-1 border border-white/10 clip-tag transition-colors"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Alterar</span>
                  </button>
                </div>

                {editingId === track.id && (
                  <div className="w-full mt-2 pt-2 border-t border-white/10 flex items-center gap-2">
                    <input
                      type="text"
                      value={tempUrl}
                      onChange={(e) => setTempUrl(e.target.value)}
                      placeholder="Cole novo URL direto da imagem..."
                      className="flex-1 bg-black/80 border border-white/20 px-2 py-1 text-xs text-white font-mono-tech focus:border-[#dc143c] outline-none"
                    />
                    <button
                      onClick={() => handleSaveEdit('track', track.id)}
                      className="px-3 py-1 bg-[#dc143c] text-white text-xs font-mono-tech font-bold clip-tag"
                    >
                      Salvar
                    </button>
                  </div>
                )}
              </div>
            ))}

          {activeTab === 'playlists' &&
            playlists.map((pl) => (
              <div
                key={pl.id}
                className="flex items-center gap-3 p-2.5 bg-white/[0.03] border border-white/10 hover:border-[#dc143c]/50 transition-all"
              >
                {pl.coverUrl ? (
                  <img
                    src={pl.coverUrl}
                    alt={pl.title}
                    className="w-12 h-12 object-cover shrink-0 border border-white/10"
                  />
                ) : (
                  <div className="w-12 h-12 bg-gradient-to-br from-[#dc143c] to-black flex items-center justify-center shrink-0">
                    <ImageIcon className="w-5 h-5 text-white" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="text-white font-kinetic font-bold text-xs truncate">
                    {pl.title}
                  </div>
                  <div className="text-white/50 text-[11px] font-mono-tech truncate">
                    {pl.subtitle}
                  </div>
                  <div className="text-[10px] text-white/40 font-mono-tech truncate mt-0.5 max-w-md">
                    {pl.coverUrl || 'Gradient Padrão'}
                  </div>
                </div>

                {pl.coverUrl && (
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => handleCopy(pl.id, pl.coverUrl)}
                      className="px-2.5 py-1.5 bg-white/5 hover:bg-white/15 text-white/80 font-mono-tech text-[10px] flex items-center gap-1 border border-white/10 clip-tag transition-colors"
                    >
                      {copiedId === pl.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">Copiado</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copiar</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => {
                        setEditingId(editingId === pl.id ? null : pl.id);
                        setTempUrl(pl.coverUrl);
                      }}
                      className="px-2.5 py-1.5 bg-white/5 hover:bg-[#dc143c] text-white font-mono-tech text-[10px] flex items-center gap-1 border border-white/10 clip-tag transition-colors"
                    >
                      <RefreshCw className="w-3 h-3" />
                      <span>Alterar</span>
                    </button>
                  </div>
                )}
                {editingId === pl.id && (
                  <div className="w-full mt-2 pt-2 border-t border-white/10 flex items-center gap-2">
                    <input
                      type="text"
                      value={tempUrl}
                      onChange={(e) => setTempUrl(e.target.value)}
                      placeholder="Cole novo URL direto..."
                      className="flex-1 bg-black/80 border border-white/20 px-2 py-1 text-xs text-white font-mono-tech focus:border-[#dc143c] outline-none"
                    />
                    <button
                      onClick={() => handleSaveEdit('playlist', pl.id)}
                      className="px-3 py-1 bg-[#dc143c] text-white text-xs font-mono-tech font-bold clip-tag"
                    >
                      Salvar
                    </button>
                  </div>
                )}
              </div>
            ))}

          {activeTab === 'artists' &&
            artists.map((art) => (
              <div
                key={art.id}
                className="flex items-center gap-3 p-2.5 bg-white/[0.03] border border-white/10 hover:border-[#dc143c]/50 transition-all"
              >
                <img
                  src={art.avatarUrl}
                  alt={art.name}
                  className="w-12 h-12 rounded-full object-cover shrink-0 border border-white/10"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-white font-kinetic font-bold text-xs truncate">
                    {art.name}
                  </div>
                  <div className="text-white/50 text-[11px] font-mono-tech truncate">
                    {art.role} • {art.followers} ouvintes
                  </div>
                  <div className="text-[10px] text-white/40 font-mono-tech truncate mt-0.5 max-w-md">
                    {art.avatarUrl}
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => handleCopy(art.id, art.avatarUrl)}
                    className="px-2.5 py-1.5 bg-white/5 hover:bg-white/15 text-white/80 font-mono-tech text-[10px] flex items-center gap-1 border border-white/10 clip-tag transition-colors"
                  >
                    {copiedId === art.id ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">Copiado</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copiar</span>
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      setEditingId(editingId === art.id ? null : art.id);
                      setTempUrl(art.avatarUrl);
                    }}
                    className="px-2.5 py-1.5 bg-white/5 hover:bg-[#dc143c] text-white font-mono-tech text-[10px] flex items-center gap-1 border border-white/10 clip-tag transition-colors"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Alterar</span>
                  </button>
                </div>
                {editingId === art.id && (
                  <div className="w-full mt-2 pt-2 border-t border-white/10 flex items-center gap-2">
                    <input
                      type="text"
                      value={tempUrl}
                      onChange={(e) => setTempUrl(e.target.value)}
                      placeholder="Cole novo URL direto..."
                      className="flex-1 bg-black/80 border border-white/20 px-2 py-1 text-xs text-white font-mono-tech focus:border-[#dc143c] outline-none"
                    />
                    <button
                      onClick={() => handleSaveEdit('artist', art.id)}
                      className="px-3 py-1 bg-[#dc143c] text-white text-xs font-mono-tech font-bold clip-tag"
                    >
                      Salvar
                    </button>
                  </div>
                )}
              </div>
            ))}

          {activeTab === 'profile' && (
            <div className="p-4 bg-white/[0.03] border border-white/10 space-y-4">
              <div className="flex items-center gap-4">
                <img
                  src={driverPortrait}
                  alt="Lando Norris #04"
                  className="w-20 h-20 object-cover border-2 border-[#dc143c] clip-corner"
                />
                <div className="flex-1">
                  <h4 className="text-white font-kinetic font-black uppercase text-base">
                    Lando Norris #04 Portrait
                  </h4>
                  <p className="text-xs font-mono-tech text-white/50">
                    Avatar oficial do Cockpit e Barra Superior
                  </p>
                  <div className="text-[10px] font-mono-tech text-white/40 break-all mt-1">
                    {driverPortrait}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-white/10">
                <button
                  onClick={() => handleCopy('driver-portrait', driverPortrait)}
                  className="px-3 py-2 bg-white/5 hover:bg-white/15 text-white text-xs font-mono-tech flex items-center gap-1.5 border border-white/10 clip-tag"
                >
                  {copiedId === 'driver-portrait' ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-400">URL Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copiar URL Direto</span>
                    </>
                  )}
                </button>
                <a
                  href={driverPortrait}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-2 bg-white/5 hover:bg-white/15 text-white/80 hover:text-white text-xs font-mono-tech flex items-center gap-1.5 border border-white/10 clip-tag"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Abrir em Nova Aba</span>
                </a>
              </div>

              <div className="space-y-1.5 pt-2">
                <label className="text-xs font-mono-tech text-white/70">
                  Substituir por outro URL de Imagem:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    defaultValue={driverPortrait}
                    id="driver-url-input"
                    className="flex-1 bg-black border border-white/20 px-3 py-1.5 text-xs text-white font-mono-tech focus:border-[#dc143c] outline-none"
                  />
                  <button
                    onClick={() => {
                      const input = document.getElementById('driver-url-input') as HTMLInputElement;
                      if (input && input.value) {
                        onUpdateDriverPortrait(input.value.trim());
                      }
                    }}
                    className="px-4 py-1.5 bg-[#dc143c] text-white font-kinetic font-black text-xs uppercase clip-tag hover:bg-red-600"
                  >
                    Atualizar
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-[#08080a] border-t border-white/10 flex items-center justify-between text-[11px] font-mono-tech text-white/50 px-4">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            Links diretos do HTML preservados e ativos
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1 bg-white/10 hover:bg-white/20 text-white clip-tag text-xs font-bold"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
