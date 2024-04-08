// This function pre-fetches all the chapter pages links for a manga in the background
"use server";

export default async function PreFetchChaterLinks(data) {
	try {
		const fetchPromises = data.map(async (element) => {
			const link = `https://consumet-api-di2e.onrender.com/meta/anilist-manga/read?chapterId=${element.id}&provider=mangadex`;
			await fetch(link, { cache: "force-cache" });
		});

		await Promise.all(fetchPromises);
		console.log("Chapter links pre-fetched successfully!");
	} catch (error) {
		console.error(
			"Error occurred while pre-fetching chapter links:",
			error
		);
	}
}
