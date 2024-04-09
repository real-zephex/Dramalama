"use server";
export async function fetch_video_link(id) {
	try {
		const res = await fetch(
			`https://consumet-jade.vercel.app/anime/gogoanime/watch/${id}`,
			{ cache: "force-cache" }
		);
		const data = await res.json();
		let vidLink = data.sources[data.sources.length - 2].url;
		return vidLink;
	} catch (error) {
		console.log("Mehh Error", error);
	}
}

export async function preFetchAnimeLinks(data, n = 40) {
	const limit = Math.min(n, data.episodes.length);

	try {
		const fetchPromises = [];
		for (let i = 0; i < limit; i++) {
			const element = data.episodes[i];
			const link = `https://consumet-jade.vercel.app/anime/gogoanime/watch/${element.id}`;
			fetchPromises.push(fetch(link, { cache: "force-cache" }));
		}

		await Promise.all(fetchPromises);
		console.log("Video links pre-fetched successfully!");
	} catch (error) {
		console.error("Error occurred while pre-fetching video links:", error);
	}
}
