import { getInfoURL } from "../../../../utils/movie_urls";

const PreFetchMovieInfo = async (data) => {
	try {
		const fetchPromises = data.results.map(async (element) => {
			const link = `${getInfoURL(element.id)}`;
			await fetch(link, { next: { revalidate: 21600 } });
		});

		await Promise.all(fetchPromises);
		console.log("Movie info pre-fetched successfully!");
	} catch (error) {
		console.error("Error occurred while pre-fetching video links:", error);
	}
};

export default PreFetchMovieInfo;
