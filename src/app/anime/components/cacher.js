"use server";

import { info_url, watch_url } from "../../../../utils/anime_urls";

export async function preFetchAnimeInfo(data) {
	try {
		const fetchPromises = data.results.map(async (element) => {
			await fetch(info_url(element.id), { next: { revalidate: 21600 } });
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
