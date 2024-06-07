"use server";
import {
	manga_search_url,
	manga_info_url,
	manga_chapters_pages,
} from "../../../../utils/manga_urls";

export const SearchedMangaResults = async (title) => {
	const res = await fetch(manga_search_url(title), {
		next: { revalidate: 21600 },
	});
	const data = await res.json();
	return data;
};

export const MangaInfoResults = async (id) => {
	const res = await fetch(manga_info_url(id), {
		next: { revalidate: 21600 },
	});
	const data = await res.json();
	return data;
};

export const MangaPages = async (id) => {
	const res = await fetch(manga_chapters_pages(id), { cache: "force-cache" });
	const data = await res.json();
	return data;
};
