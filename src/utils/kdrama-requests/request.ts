"use server";

import { DramaSearchRecentPopular, DramaInfo, DramaLinks } from "../types";

const dramacool_scraper = process.env.DRAMACOOL_SCRAPER;
const consumet_api = process.env.CONSUMET_API_URL;
const NEXT_CACHE_DURATION = 21600;

// RequestFetcher
const RequestFetcher = async (url: string) => {
  try {
    const res = await fetch(url, { next: { revalidate: NEXT_CACHE_DURATION } });

    if (!res.ok) {
      throw new Error(`Request failed with ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error(`Failed to fetch from ${url}:`, error);
    throw error;
  }
};

// Popular and Recent dramas
export const PopularRecentDramas = async ({
  type,
}: {
  type: "popular" | "recent";
}) => {
  const url = `${dramacool_scraper}/${type}`;
  return RequestFetcher(url) as Promise<DramaSearchRecentPopular>;
};

// DramaInfo
export const DramaInfoFetcher = async ({ dramaId }: { dramaId: string }) => {
  const url = `${consumet_api}/movies/dramacool/info?id=drama-detail/${dramaId}`;
  return RequestFetcher(url) as Promise<DramaInfo>;
};

// DramaLinks
export const DramaLinksFetcher = async ({
  dramaId,
  episodeId,
}: {
  dramaId: string;
  episodeId: string;
}) => {
  const url = `${consumet_api}/movies/dramacool/watch?episodeId=${episodeId}&mediaId=${dramaId}`;
  return RequestFetcher(url) as Promise<DramaLinks>;
};

export const SearchDramas = async (title: string) => {
  const url = `${consumet_api}/movies/dramacool/${encodeURIComponent(title)}`;
  return RequestFetcher(url) as Promise<DramaSearchRecentPopular>;
};
