"use server";

export default async function Results(id) {
	return await testFunction(id);
}

async function testFunction(title) {
	const res = await fetch(
		"https://consumet-jade.vercel.app/anime/gogoanime/" + title,
		{ next: { revalidate: 21600 } }
	);
	const data = await res.json();
	return data;
}
