"use server";

import {
	popular_dramas_url,
	recent_drama_url,
	search_drama_url,
	drama_info_url,
	videoURL,
} from "../../../../utils/kdrama_urls";

export const DramaDataFetcher = async (type) => {
	const options = {
		popular: popular_dramas_url,
		recent: recent_drama_url,
	};
	const res = await fetch(options[type], { next: { revalidate: 21600 } });
	const data = await res.json();
	return data;
};

export const SearchedDramaData = async (title) => {
	const res = await fetch(search_drama_url(title), {
		next: { revalidate: 21600 },
	});
	const data = await res.json();
	return data;
};

export const dramaInfo = async (id) => {
	const res = await fetch(drama_info_url(id), {
		next: { revalidate: 21600 },
	});
	const data = await res.json();
	return data;
};

export const videoLink = async (epiId, mediaId) => {
	const res = await fetch(videoURL(epiId, mediaId), {
		cache: "force-cache",
	});
	const data = await res.json();
	const vidLink = await data.sources[0].url;
	return vidLink;
};
