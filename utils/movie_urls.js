export const API_KEY = "171fe27dbfecc58e2a18fbced644cda9";
export const PROXY = "https://sup-proxy.zephex0-f6c.workers.dev/api-json?url=";

// MOVIES
export const TRENDING = `${PROXY}https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`;
export const SEARCH = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;
export const POPULAR = `${PROXY}https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;
export const getInfoURL = (movieId) =>
	`${PROXY}https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`;
