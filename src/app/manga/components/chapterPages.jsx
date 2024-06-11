"use server";

import { MangaPages } from "./requests";
import Image from "next/image";

const MangaChapters = async (id) => {
	const data = await MangaPages(id);

	let chapterPages = [];
	for (let items of data.chapter.data) {
		chapterPages.push(`${data.baseUrl}/data/${data.chapter.hash}/${items}`);
	}

	return (
		<div className="flex flex-col items-center">
			{chapterPages &&
				chapterPages.length > 0 &&
				chapterPages.map((item, index) => (
					<div key={index} className="mb-4">
						<Image
							src={`https://sup-proxy.zephex0-f6c.workers.dev/api-content?url=${item}&referer=https://mangadex.org`}
							width={1280}
							height={720}
							className="h-auto w-auto rounded-md"
							alt="Manga Pages"
						/>
						<p className="text-center">{index}</p>
					</div>
				))}
		</div>
	);
};

export default MangaChapters;
