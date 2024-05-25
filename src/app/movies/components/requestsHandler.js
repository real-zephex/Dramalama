"use server";

import {
	SEARCH,
	TRENDING,
	POPULAR,
	getInfoURL,
	TOP_RATED,
	NOW_IN_THEATERS,
	UPCOMING_MOVIES,
} from "../../../../utils/movie_urls";

export const SearchMovie = async (title) => {
	const res = await fetch(SEARCH(title), { next: { revalidate: 21600 } });
	const data = await res.json();
	return data;
};

export const MovieHomepageDataFetcher = async (type) => {
	const dataAvailable = {
		trending: TRENDING,
		popular: POPULAR,
		top: TOP_RATED,
	};
	const res = await fetch(dataAvailable[type], {
		next: { revalidate: 21600 },
	});
	const data = await res.json();
	return data;
};

export const MovieInfoData = async (id) => {
	const res = await fetch(getInfoURL(id), { cache: "force-cache" });
	const data = await res.json();
	return data;
};
