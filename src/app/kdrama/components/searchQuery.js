"use server";

export default async function FetchSearchTitle(title) {
	const res = await fetch(
		`https://consumet-jade.vercel.app/movies/dramacool/${title}`,
		{ cache: "force-cache" }
	);
	const data = await res.json();
	return data;
}
