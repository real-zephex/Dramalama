"use server";

import { drama_info_url } from "../../../../utils/kdrama_urls";
import { videoLink } from "./requests";

export async function PreFetchKdramaInfo(data) {
	try {
		const fetchPromises = data.results.map(async (element) => {
			await fetch(drama_info_url(element.id), {
				next: { revalidate: 21600 },
			});
		});

		await Promise.all(fetchPromises);
		console.log("Drama info fetched successfully.");
	} catch (error) {
		console.error("Error occurred while pre-fetching video links:", error);
	}
}

export const PreFetchVideoLinks = async (data, mediaID) => {
	try {
		const fetchPromise = data.map(async (element) => {
			await videoLink(element.id, mediaID);
		});

		await Promise.all(fetchPromise);
		console.log("Kdrama video links pre fetched successfully");
	} catch (error) {
		console.error("Error occured while fetching video links");
	}
};
