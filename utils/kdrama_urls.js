const base_url_one = "https://dramacool-scraper.vercel.app";
const base_url_two = "https://consumet-jade.vercel.app/movies/dramacool";

export const popular_dramas_url = `${base_url_one}/popular`;

export const recent_drama_url = `${base_url_one}/recent`;

export const search_drama_url = (title) => `${base_url_two}/${title}`;

export const drama_info_url = (id) => `${base_url_two}/info?id=${id}`;

export const videoURL = (episodeId, mediaId) => {
	return `${base_url_two}/watch?episodeId=${episodeId}&mediaId=${mediaId}`;
};
