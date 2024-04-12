// This function pre-fetches all the video links for a drama in the background
"use server";

export default async function PreFetchVideoLinks(data, dramaId) {
	try {
		const fetchPromises = data.map(async (element) => {
			const link = `https://consumet-jade.vercel.app/movies/dramacool/watch?episodeId=${element.id}&mediaId=${dramaId}`;
			await fetch(link, { cache: "force-cache" });
		});

		await Promise.all(fetchPromises);
		console.log("Video links pre-fetched successfully!");
	} catch (error) {
		console.error("Error occurred while pre-fetching video links:", error);
	}
}
