// This file pre fetches all the videolinks and next js automatically caches them!

export default async function VideoLinkCacher(data, dramaId) {
	data.forEach(async (element) => {
		const link = `https://consumet-api-di2e.onrender.com/movies/dramacool/watch?episodeId=${element.id}&mediaId=${dramaId}`;
		await fetch(link, { cache: "force-cache" });
	});
}
