"use server";

export default async function testFunction(title) {
	const res = await fetch(
		"https://dramalama-api.vercel.app/anime/gogoanime/" + title
	);
	const data = await res.json();
	return data;
}
