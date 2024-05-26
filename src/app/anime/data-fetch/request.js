"use server";

import {
	popular_url,
	recent_epsiodes_url,
	top_airing_url,
	search_url,
	info_url,
	watch_url,
} from "../../../../utils/anime_urls";

export const popular = async () => {
	const res = await fetch(popular_url, { next: { revalidate: 21600 } });
	const data = await res.json();
	return data;
};

export const recent = async () => {
	const res = await fetch(recent_epsiodes_url, {
		next: { revalidate: 21600 },
	});
	const data = await res.json();
	return data;
};

export const top_airing = async () => {
	const res = await fetch(top_airing_url, { next: { revalidate: 21600 } });
	const data = await res.json();
	return data;
};

export const search_results = async (title) => {
	const res = await fetch(search_url(title), {
		next: { revalidate: 21600 },
	});
	const data = await res.json();
	return data;
};

export const anime_info = async (id) => {
	const res = await fetch(info_url(id), {
		next: { revalidate: 21600 },
	});
	const data = await res.json();
	return data;
};

export const video_url = async (episodeId) => {
	const res = await fetch(watch_url(episodeId), {
		cache: "force-cache",
	});
	const data = await res.json();
	return data;
};
