import { PROXY } from "./movie_urls";

// Using gogoanime
export const base_url = `https://consumet-jade.vercel.app/anime/gogoanime`;
export const popular_url = `${PROXY}${base_url}/popular`;
export const top_airing_url = `${PROXY}${base_url}/top-airing`;
export const recent_epsiodes_url = `${PROXY}${base_url}/recent-episodes`;
export const search_url = (title) => `${PROXY}${base_url}/${title}`;
export const info_url = (id) => {
	return `${PROXY}${base_url}/info/${id}`;
};
export const watch_url = (episodeId) =>
	`${PROXY}${base_url}/watch/${episodeId}`;
