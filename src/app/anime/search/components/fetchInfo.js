"use server";

export default async function Results(id) {
	return await testFunction(id);
}

async function testFunction(title) {
	const res = await fetch(
		"https://consumet-api-di2e.onrender.com/anime/gogoanime/" + title,
		{ cache: "force-cache" }
	);
	const data = await res.json();
	return data;
}
