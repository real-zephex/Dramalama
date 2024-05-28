export const API_KEY = "171fe27dbfecc58e2a18fbced644cda9";
export const PROXY = "https://sup-proxy.zephex0-f6c.workers.dev/api-json?url=";

export const TRENDING = `${PROXY}https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`;

export const SEARCH = (title) => {
	return `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${title}`;
};

export const POPULAR = `${PROXY}https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;

export const getInfoURL = (movieId) => {
	return `${PROXY}https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`;
};

export const TOP_RATED = `${PROXY}https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`;

export const UPCOMING_MOVIES = `${PROXY}https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`;

export const NOW_IN_THEATERS = `${PROXY}https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`;

