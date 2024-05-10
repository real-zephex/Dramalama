import { PROXY } from "./movie_urls";

// Using gogoanime
export const base_url = `${PROXY}https://consumet-jade.vercel.app/anime/gogoanime`;
export const popular_url = `${base_url}/popular`;
export const top_airing_url = `${base_url}/top-airing`;
export const recent_epsiodes_url = `${base_url}/recent-episodes`;
export const search_url = (title) => `${base_url}/${title}`;
export const info_url = (id) => `${base_url}/info/${id}`;
export const watch_url = (episodeId) => `${base_url}/watch/${episodeId}`;
