"use server";

import { SERIES_INFO } from "./data-fetch";

const PreFecthSeriesInfo = async (data) => {
	try {
		const fetchPromises = data.results.map(async (element) => {
			await SERIES_INFO(element.id);
		});

		await Promise.all(fetchPromises);
		console.log("Series info pre-fetched successfully!");
	} catch (error) {
		console.error(
			"Error occurred while pre-fetching series info page:",
			error,
		);
	}
};

export default PreFecthSeriesInfo;
