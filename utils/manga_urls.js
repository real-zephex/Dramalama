import { PROXY } from "./movie_urls";

const base_url = `https://consumet-jade.vercel.app/meta/anilist-manga/`;

export const manga_search_url = (title) => {
	return `${base_url}${title}`;
};

export const manga_info_url = (id) => {
	return `${base_url}info/${id}?provider=mangadex`;
};

export const manga_chapters_pages = (id) => {
	return `https://api.mangadex.org/at-home/server/${id}`;
};
