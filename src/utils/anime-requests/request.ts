"use server";

const parent_url = process.env.CONSUMET_API_URL;

import { AniwatchLinks, AniwatchVideoLinks } from "../more-types";
import {
  AnimeLinks,
  GogoanimeSearch,
  GogoanimeInfo,
  GogoEpisode,
} from "../types";

const ANIWATCH = process.env.ANIWATCH_URL as string;
const HLS_PROXY = process.env.NEXT_PUBLIC_M3U8_PROXY as string;

export const AnimeRequestHandler = async ({
  search = false,
  searchQuery = "",
  info = false,
  animeId = "",
  watch = false,
  episodeId = "",
  trending = false,
  popular = false,
  recent = false,
  cacheDuration = 21600,
}: {
  search?: boolean;
  searchQuery?: string;
  info?: boolean;
  animeId?: string;
  watch?: boolean;
  episodeId?: string;
  trending?: boolean;
  popular?: boolean;
  recent?: boolean;
  cacheDuration?: number;
}): Promise<GogoanimeSearch | GogoanimeInfo | AnimeLinks | any> => {
  const url =
    search && searchQuery
      ? `${parent_url}/anime/gogoanime/${encodeURIComponent(searchQuery)}`
      : info && animeId
      ? `${parent_url}/anime/gogoanime/info/${animeId}`
      : watch && episodeId
      ? `${parent_url}/anime/gogoanime/watch/${episodeId}`
      : trending
      ? `${parent_url}/anime/gogoanime/top-airing`
      : recent
      ? `${parent_url}/anime/gogoanime/recent-episodes`
      : "";

  try {
    const res = await fetch(url, { next: { revalidate: cacheDuration } });

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();

    return search || trending
      ? (data as GogoanimeSearch)
      : info
      ? (data as GogoanimeInfo)
      : watch
      ? (data as AnimeLinks)
      : data;
  } catch (error) {
    console.log("Some Error occuredL ", error);
    throw error;
  }
};

export async function animeLinksCacher(
  data: GogoEpisode[],
  start: number,
  end: number
) {
  const array = data.slice(start, end);
  try {
    const fetchPromise = array.map(async (element) => {
      await fetch(`${parent_url}/anime/gogoanime/watch/${element.id}`, {
        cache: "force-cache",
      });
    });
    await Promise.all(fetchPromise);
    return true;
  } catch (error) {
    console.error("Error: ", error);
    return false;
  }
}

export async function AniwatchResults(id: string) {
  try {
    const aniwatchData: AniwatchLinks = await fetch(
      `${process.env.ANIWATCH_GOGO_MAPPER}/${id}`,
      {
        next: { revalidate: 1800 },
      }
    ).then((response) => response.json());
    return aniwatchData;
  } catch (error) {
    return null;
  }
}

interface VideoSources {
  title: string;
  url: string;
}
export async function AniwatchVideoLinksHandler({
  id,
  type,
}: {
  id: string;
  type: "dub" | "sub";
}) {
  const hd_1_url = `${ANIWATCH}/episode-srcs?id=${id}&server=hd-1&category=${type}`;
  const hd_2_url = `${ANIWATCH}/episode-srcs?id=${id}&server=hd-2&category=${type}`;

  try {
    const [responseHd1, responseHd2] = await Promise.all([
      fetch(hd_1_url, { next: { revalidate: 11800 } }),
      fetch(hd_2_url, { next: { revalidate: 11800 } }),
    ]);

    if (!responseHd1.ok || !responseHd2.ok) {
      throw new Error("Failed to fetch data from one or more URLs"); // ig it's better to ditch the whole process if one of the urls fail to fetch the data
    }

    // Parse responses as JSON
    const dataHd1: AniwatchVideoLinks = await responseHd1.json();
    const dataHd2: AniwatchVideoLinks = await responseHd2.json();

    const intro = dataHd1.intro || null;
    const outro = dataHd1.outro || null;

    const thumnails = dataHd1.tracks
      ? dataHd1.tracks?.find((element) => element.kind === "thumbnails")?.file
      : "";

    const subtitles = dataHd1.tracks?.filter(
      (element) => element.kind === "captions"
    );

    let sources: VideoSources[] = [];
    if (dataHd1.sources) {
      sources.push({
        title: `HD-1 ${type}`,
        url: `${HLS_PROXY}${dataHd1.sources[0].url!}`,
      });
    }
    if (dataHd2.sources) {
      sources.push({
        title: `HD-2 ${type}`,
        url: `${HLS_PROXY}${dataHd2.sources[0].url!}`,
      });
    }

    return {
      thumnails,
      subtitles,
      sources,
      intro,
      outro,
    };
  } catch (error) {
    console.error(`Function failed with the following error: ${error}`);
    return null;
  }
}
