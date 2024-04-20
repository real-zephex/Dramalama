// This function pre-fetches all the chapter pages links for a manga in the background
"use server";

export async function PreFetchChaterLinks(data) {
	try {
		const fetchPromises = data.map(async (element) => {
			const link = `https://consumet-jade.vercel.app/meta/anilist-manga/read?chapterId=${element.id}&provider=mangadex`;
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

export async function PreFetchMangaInfo(data) {
	try {
		const fetchPromises = data.results.map(async (element) => {
			const link = `https://consumet-jade.vercel.app/meta/anilist-manga/${element.id}?provider=mangadex`;
			await fetch(link, { next: { revalidate: 86400 } });
		});
		await Promise.all(fetchPromises);
		console.log("Manga info pre-fetched successfully!");
	} catch (error) {
		console.error("error", error);
	}
}
