"use server";

import { anime_info } from "../data-fetch/request";

export async function preFetchAnimeInfo(data) {
	try {
		const fetchPromises = data.results.map(async (element) => {
			await anime_info(element.id);
		});

		await Promise.all(fetchPromises);
		console.log("Anime info pre-fetched successfully!");
	} catch (error) {
		console.error("Error occurred while pre-fetching anime info: ", error);
	}
}

export async function preFetchVideoLinks(data) {
	try {
		const fetchPromises = data.map(async (element) => {
			await fetch(watch_url(element.id), { next: { revalidate: 21600 } });
		});

		await Promise.all(fetchPromises);
		console.log("Anime video links info pre-fetched successfully!");
	} catch (error) {
		console.error("Error occurred while pre-fetching anime info: ", error);
	}
}
