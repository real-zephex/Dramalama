"use server";

export async function PreFetchKdramaInfo(data) {
	try {
		const fetchPromises = data.results.map(async (element) => {
			const link = `https://consumet-jade.vercel.app/movies/dramacool/info?id=${element.id}`;
			await fetch(link, { next: { revalidate: 21600 } });
		});

		await Promise.all(fetchPromises);
		console.log("Drama info fetched successfully.");
	} catch (error) {
		console.error("Error occurred while pre-fetching video links:", error);
	}
}
