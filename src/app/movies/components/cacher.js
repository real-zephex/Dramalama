import { MovieInfoData } from "./requestsHandler";

const PreFetchMovieInfo = async (data) => {
	try {
		const fetchPromises = data.results.map(async (element) => {
			await MovieInfoData(element.id);
		});

		await Promise.all(fetchPromises);
		console.log("Movie info pre-fetched successfully!");
	} catch (error) {
		console.error("Error occurred while pre-fetching video links:", error);
	}
};

export default PreFetchMovieInfo;
