export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  coverUrl: string;
  duration: number; // in seconds
  bpm?: number;
  badge?: string;
  isLossless?: boolean;
  sampleRate?: string;
  audioPreviewUrl?: string;
  isLiked?: boolean;
}

export interface Playlist {
  id: string;
  title: string;
  subtitle: string;
  coverUrl: string;
  trackCount?: number;
  bpm?: number;
  badge?: string;
  category: 'mix' | 'chart' | 'radar' | 'paddock' | 'chill';
  tracks?: Track[];
}

export interface Artist {
  id: string;
  name: string;
  role: string;
  avatarUrl: string;
  gridRank?: string;
  followers?: string;
}

export interface ChartItem {
  id: string;
  rank: string;
  title: string;
  region: string;
  tag: string;
  description: string;
  accentColor: string;
}

export type ViewMode = 'auto' | 'desktop' | 'mobile';

export type ActiveTab = 'inicio' | 'buscar' | 'biblioteca';

export type CategoryFilter = 'all' | 'musica' | 'podcasts' | 'paddock' | 'pitlane';
