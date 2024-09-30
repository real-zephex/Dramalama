"use server";

import {
  FlixHQSeriesInfo,
  FlixHQSeriesLinks,
  VidSrcCCLinks,
} from "../more-types";
import {
  TrendingPopularTopAiringTV,
  TVSearch,
  TVCredits,
  TVImages,
  TVInfo,
  TVSeasonInfo,
  TVEpisodeInfo,
  FlixHQMovieLinks,
} from "../types";
import { getRandomApiKey } from "../api-key-randomizer";

const api_key = getRandomApiKey();
const parent_url = `https://api.themoviedb.org/3`;
const CONSUMET = process.env.CONSUMET_API_URL;
const NEXT_CACHE_DURATION = 21600 * 2;
const VIDSRC_CC = "https://dramaflix-movielinks.vercel.app";

const requestHandler = async (url: string) => {
  try {
    const res = await fetch(url, { next: { revalidate: NEXT_CACHE_DURATION } });
    return await res.json();
  } catch (error) {
    console.error("An error occured (logged)", url, error);
    return {};
  }
};

export const TopPopularAiringTV = async ({
  type = "popular",
}: {
  type: "airing_today" | "top_rated" | "popular";
}) => {
  const url = `${parent_url}/tv/${type}?api_key=${api_key}`;
  return (await requestHandler(url)) as TrendingPopularTopAiringTV;
};

export const InfoImagesCreditsTV = async ({
  type,
  id,
}: {
  type: "info" | "images" | "credits";
  id: number;
}) => {
  const urlMap: Record<string, string> = {
    info: `${parent_url}/tv/${id}?api_key=${api_key}`,
    images: `${parent_url}/tv/${id}/images?api_key=${api_key}`,
    credits: `${parent_url}/tv/${id}/credits?api_key=${api_key}`,
  };

  const url = urlMap[type];

  if (!url) {
    throw new Error("Invalid type provided");
  }

  const response = await requestHandler(url);

  switch (type) {
    case "credits":
      return response as TVCredits;
    case "images":
      return response as TVImages;
    case "info":
    default:
      return response as TVInfo;
  }
};

export const SearchTV = async ({ title }: { title: string }) => {
  const url = `${parent_url}/search/tv?query=${encodeURIComponent(
    title
  )}&api_key=${api_key}`;
  return (await requestHandler(url)) as TVSearch;
};

export const TrendingTV = async ({
  time_window = "day",
}: {
  time_window: "day" | "week";
}) => {
  const url = `${parent_url}/trending/tv/${time_window}?api_key=${api_key}`;
  return (await requestHandler(url)) as TrendingPopularTopAiringTV;
};

export const SeasonInfo = async ({
  id,
  season,
}: {
  id: number;
  season: number;
}) => {
  const url = `${parent_url}/tv/${id}/season/${season}?api_key=${api_key}`;
  return (await requestHandler(url)) as TVSeasonInfo;
};

export const EpisodeInfo = async ({
  id,
  season,
  episode,
}: {
  id: string;
  season: string;
  episode: string;
}) => {
  const url = `${parent_url}/tv/${id}/season/${season}/episode/${episode}?api_key=${api_key}`;
  return (await requestHandler(url)) as TVEpisodeInfo;
};

export const FlixHQEpisodeInfo = async ({
  seriesId,
  season,
  episode,
}: {
  seriesId: string;
  season: string;
  episode: string;
}) => {
  const infoUrl = `${CONSUMET}/meta/tmdb/info/${seriesId}?type=tv`;
  const infoData: FlixHQSeriesInfo = await fetch(infoUrl, {
    next: { revalidate: NEXT_CACHE_DURATION },
  }).then((response) => response.json());

  // important
  const { title, id } = infoData;

  const seasonSection = infoData.seasons?.find(
    (element) => element.season?.toString() == season
  );
  const episodeId = seasonSection?.episodes?.find(
    (element) => element.episode?.toString() == episode
  );

  const cover = episodeId?.img?.hd;

  const seriesVideoLink = `${CONSUMET}/meta/tmdb/watch/${episodeId?.id}?id=${id}`;
  const videoData: FlixHQSeriesLinks = await fetch(seriesVideoLink, {
    next: { revalidate: NEXT_CACHE_DURATION },
  }).then((response) => response.json());

  // important
  const videoURL = videoData.sources?.find(
    (element) => element.quality === "auto"
  );

  const subs = videoData.subtitles;

  let link2, link3;
  try {
    const vidsrcData: VidSrcCCLinks = await fetch(
      `{VIDSRC_CC}/vidsrc/${seriesId}?s=${season}&e=${episode}`,
      { next: { revalidate: NEXT_CACHE_DURATION } }
    ).then((response) => response.json());

    if (vidsrcData.source2?.data) {
      link2 = vidsrcData.source2.data.source;
    }
    if (vidsrcData.source1?.data) {
      const tempLink = vidsrcData.source1.data.source;
      if (tempLink != videoURL?.url) {
        link3 = tempLink;
      }
    }
  } catch (error) {
    console.error("Logged Error: ", error);
  }

  return {
    title,
    cover,
    videoURL,
    subs,
    link2,
    link3,
  };
};
