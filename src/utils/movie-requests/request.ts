"use server";

import { VidSrcCCLinks } from "../more-types";
// Movies Related Request

import {
  MoviesHomepageResults,
  MovieInfoType,
  TVCredits,
  TVImages,
  FlixHQResults,
  FlixHQMovieLinks,
} from "../types";
import { getRandomApiKey } from "../api-key-randomizer";

// Constants

const BASE_URL = "https://api.themoviedb.org/3";
const VIDSRC_CC = "https://dramaflix-movielinks.vercel.app";
const CONSUMET = process.env.CONSUMET_API_URL;
const CACHE_DURATION = 21600 * 2; // Cache duration in seconds (6 hours)

// Utility function to construct URL
function constructUrl(
  endpoint: string,
  queryParams: Record<string, string> = {}
) {
  const url = new URL(`${BASE_URL}/${endpoint}`);
  url.searchParams.set("api_key", getRandomApiKey());
  Object.keys(queryParams).forEach((key) =>
    url.searchParams.set(key, queryParams[key])
  );
  return url.toString();
}

// Discover movies based on type and time window
export async function MoviesDiscover(
  type: string,
  timeWindow: "day" | "week" = "day"
) {
  const endpoint =
    type === "trending" ? `trending/movie/${timeWindow}` : `movie/${type}`;

  const url = constructUrl(endpoint);

  try {
    const response = await fetch(url, { next: { revalidate: CACHE_DURATION } });
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const data: MoviesHomepageResults = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching ${type} movies:`, error);
  }
}

// Search for movies based on query
export async function MoviesSearchRequest(query: string) {
  const url = constructUrl("search/movie", { query });

  try {
    const response = await fetch(url, { next: { revalidate: CACHE_DURATION } });
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const data: MoviesHomepageResults = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching search results:", error);
  }
}

// Fetch movie details or recommendations
export async function MovieInfo(
  id: string,
  recommendations: boolean = false
): Promise<MovieInfoType | undefined> {
  const endpoint = recommendations
    ? `movie/${id}/recommendations`
    : `movie/${id}`;

  const url = constructUrl(endpoint);

  try {
    const response = await fetch(url, {
      next: { revalidate: CACHE_DURATION },
    });
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const data: MovieInfoType = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching movie info:", error);
  }
}

export async function MovieCredits({
  id,
  type = "credits",
}: {
  id: string;
  type: "credits" | "images";
}) {
  const url = `${BASE_URL}/movie/${id}/${type}?api_key=${getRandomApiKey()}`;
  const res = await fetch(url, { next: { revalidate: CACHE_DURATION } });
  // return (await res.json()) as TVCredits;
  if (type === "credits") {
    return (await res.json()) as TVCredits;
  } else {
    return (await res.json()) as TVImages;
  }
}

export const FlixHQResultsHandler = async ({
  movieId,
}: {
  movieId: string;
}) => {
  const url = `${CONSUMET}/meta/tmdb/info/${movieId}?type=movie`;
  const res = await fetch(url, { next: { revalidate: CACHE_DURATION } });
  const data: FlixHQResults = await res.json();
  let { id, episodeId, title, cover } = data;

  let subtitles, headers, movieLink;
  try {
    const linksData: FlixHQMovieLinks = await fetch(
      `${CONSUMET}/meta/tmdb/watch/${episodeId}?id=${id}`,
      { next: { revalidate: CACHE_DURATION } }
    ).then((response) => response.json());

    subtitles = linksData.subtitles || [];
    headers = linksData.headers?.Referer || "";

    movieLink = linksData.sources?.find(
      (element) => element.quality === "auto"
    );
  } catch (error) {
    console.error(
      "Error fetching link from consumet's tmdb endpoint. Request failed with following error",
      error
    );
  }

  let link2, link3;
  try {
    const vidccLinks: VidSrcCCLinks = await fetch(
      `${VIDSRC_CC}/vidsrc/${movieId}`,
      { next: { revalidate: CACHE_DURATION } }
    ).then((response) => response.json());

    if (vidccLinks.source2?.data) {
      link2 = vidccLinks.source2.data.source;
    }
    if (vidccLinks.source1?.data) {
      const tempLink = vidccLinks.source1.data.source;
      if (tempLink != movieLink) {
        link3 = tempLink;
      }
    }
  } catch (error) {
    console.error(
      `Error fetching links from vidsrc api (temp-res.vercel.app), request failed with following error ${error}`
    );
  }
  return {
    movieLink,
    subtitles,
    title,
    cover,
    link2,
    link3,
    headers,
  };
};
