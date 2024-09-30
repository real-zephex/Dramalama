export interface FlixHQSeriesInfo {
  id?: string;
  title?: string;
  translations?: Translation[];
  image?: string;
  cover?: string;
  logos?: Logo[];
  type?: Type;
  rating?: number;
  releaseDate?: Date;
  description?: string;
  genres?: string[];
  duration?: number;
  totalEpisodes?: number;
  totalSeasons?: number;
  directors?: any[];
  writers?: any[];
  actors?: string[];
  trailer?: Trailer;
  mappings?: Mappings;
  similar?: Recommendation[];
  recommendations?: Recommendation[];
  seasons?: Season[];
}

interface Logo {
  url?: string;
  aspectRatio?: number;
  width?: number;
}

interface Mappings {
  imdb?: string;
  tmdb?: number;
}

interface Recommendation {
  id?: number;
  title?: string;
  image?: string;
  type?: Type;
  rating?: number;
  releaseDate?: string;
}

enum Type {
  TVSeries = "TV Series",
}

interface Season {
  season?: number;
  image?: Image;
  episodes?: Episode[];
  isReleased?: boolean;
}

interface Episode {
  id?: string;
  title?: string;
  episode?: number;
  season?: number;
  releaseDate?: Date;
  description?: string;
  url?: string;
  img?: Image;
}

interface Image {
  mobile?: string;
  hd?: string;
}

interface Trailer {
  id?: string;
  site?: string;
  url?: string;
}

interface Translation {
  title?: string;
  description?: string;
  language?: string;
}

export interface FlixHQSeriesLinks {
  headers?: Headers;
  sources?: Source[];
  subtitles?: Subtitle[];
}

interface Headers {
  Referer?: string;
}

interface Source {
  url?: string;
  quality?: string;
  isM3U8?: boolean;
}

interface Subtitle {
  url?: string;
  lang?: string;
}

export interface VidSrcCCLinks {
  source1?: Source1;
  source2?: Source2;
}

interface Source1 {
  data?: Source1Data;
  success?: boolean;
}

interface Source1Data {
  source?: string;
  subtitles?: VidSrcCCSubtitle[];
  format?: string;
}

interface VidSrcCCSubtitle {
  label?: string;
  file?: string;
}

interface Source2 {
  data?: Source2Data;
  success?: boolean;
}

interface Source2Data {
  source?: string;
  subtitles?: VidSrcCCSubtitle[];
  format: string;
}

// Aniwatch
export interface AniwatchLinks {
  totalEpisodes?: number;
  episodes?: AniwatchEpisode[];
}

interface AniwatchEpisode {
  title?: string;
  episodeId?: string;
  number?: number;
  isFiller?: boolean;
}

// aniwatch video links
export interface AniwatchVideoLinks {
  tracks?: Track[];
  intro?: Tro;
  outro?: Tro;
  sources?: AniwatchSource[];
  anilistID?: number;
  malID?: number;
}

export interface Tro {
  start: number;
  end: number;
}

interface AniwatchSource {
  url?: string;
  type?: string;
}

export interface Track {
  file?: string;
  label?: string;
  kind?: Kind;
  default?: boolean;
}

enum Kind {
  Captions = "captions",
  Thumbnails = "thumbnails",
}
