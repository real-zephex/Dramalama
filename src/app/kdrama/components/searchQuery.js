export default async function FetchSearchTitle(title) {
	const res = await fetch(
		`https://consumet-api-di2e.onrender.com/movies/dramacool/${title}`,
		{ cache: "force-cache" }
	);
	const data = await res.json();
	return data;
}
