"use server";

export default async function Results(id) {
	return await testFunction(id);
}

async function testFunction(title) {
	const res = await fetch(
		"https://dramalama-api.vercel.app/anime/gogoanime/" + title,
		{ cache: "force-cache" }
	);
	const data = await res.json();
	return data;
}
