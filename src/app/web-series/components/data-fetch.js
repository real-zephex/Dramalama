"use server";

import {
	popular_tv_shows,
	trending_tv_shows,
	top_rated_shows,
	recommended_shows,
	crew_details,
	tv_info,
	search_tv,
} from "../../../../utils/series_urls";

export const POPULAR_SHOWS = async () => {
	try {
		const res = await fetch(popular_tv_shows(), {
			next: {
				revalidate: 21600,
			},
		});
		const data = await res.json();
		return data;
	} catch (error) {
		throw new Error(error.message);
	}
};

export const TRENDING_SHOWS = async () => {
	try {
		const res = await fetch(trending_tv_shows(), {
			next: {
				revalidate: 21600,
			},
		});
		const data = await res.json();
		return data;
	} catch (error) {
		throw new Error(error.message);
	}
};

export const TOP_SHOWS = async () => {
	try {
		const res = await fetch(top_rated_shows(), {
			next: {
				revalidate: 21600,
			},
		});
		const data = await res.json();
		return data;
	} catch (error) {
		throw new Error(error.message);
	}
};

export const SERIES_INFO = async (id) => {
	try {
		const res = await fetch(tv_info(id), { next: { revalidate: 21600 } });
		const data = await res.json();
		return data;
	} catch (error) {
		throw new Error(error.message);
	}
};

export const CREW_DETAILS = async (id) => {
	try {
		const res = await fetch(crew_details(id), {
			next: { revalidate: 21600 },
		});
		const data = await res.json();
		return data;
	} catch (error) {
		throw new Error(error.message);
	}
};

export const SEARCH_TV = async (title) => {
	try {
		const res = await fetch(search_tv(title), {
			next: { revalidate: 21600 },
		});
		const data = await res.json();
		return data;
	} catch (error) {
		throw new Error(error.message);
	}
};
