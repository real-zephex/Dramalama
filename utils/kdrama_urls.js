const base_url_one = "https://dramacool-scraper.vercel.app";
const base_url_two = "https://consumet-jade.vercel.app/movies/dramacool";
const proxy_url = "https://sup-proxy.zephex0-f6c.workers.dev/api-json?url=";

export const popular_dramas_url = `${base_url_one}/popular`;

export const recent_drama_url = `${base_url_one}/recent`;

export const search_drama_url = (title) => `${base_url_two}/${title}`;

export const drama_info_url = (id) => `${base_url_two}/info?id=${id}`;

export const videoURL = (episodeId, mediaId) => {
	return `https://consumet-jade.vercel.app/movies/dramacool/watch?episodeId=${episodeId}&mediaId=${mediaId}`;
};
