const API_KEY = "171fe27dbfecc58e2a18fbced644cda9";

// MOVIES
export const TRENDING = `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`;
export const SEARCH = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;
export const POPULAR = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;
export const getInfoURL = (movieId) =>
	`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`;
