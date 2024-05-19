import { API_KEY, PROXY } from "./movie_urls";

// Popular TV shows
export const popular_tv_shows = () =>
	`${PROXY}https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}`;

// Trending show either for the week or the day
export const trending_tv_shows = (duration = "day") =>
	`${PROXY}https://api.themoviedb.org/3/trending/tv/${duration}?api_key=${API_KEY}`;

// Top Rated TV Shows
export const top_rated_shows = () =>
	`${PROXY}https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}`;

// Recommendations based on a particular show
export const recommended_shows = (id) =>
	`https://api.themoviedb.org/3/tv/${id}/recommendations?api_key=${API_KEY}`;

// Crew Details
export const crew_details = (id) =>
	`https://api.themoviedb.org/3/tv/${id}/credits?api_key=${API_KEY}`;

// TV Info
export const tv_info = (id) =>
	`https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}`;

// Search shows
export const search_tv = (query) => `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&query=${query}`