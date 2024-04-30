"use client";

import styles from "./info.module.css";
import Link from "next/link";
import { storeLocal } from "../../history/storeData";

export default function Buttons({ content: data }) {
	let hasValidLinks = false;
	function store_to_local(title, chapter, volume, image, id, id2) {
		let data = {
			title: title,
			chapter: chapter,
			volume: volume,
			image: image,
			id: id,
			mangaId: id2,
		};
		storeLocal(data);
	}

	return (
		<div className={styles.ChapterContainer}>
			{data.chapters &&
				data.chapters.map((item, index) => {
					if (item.pages !== 0) {
						hasValidLinks = true;
						return (
							<Link
								key={index}
								href={{
									pathname: `/manga/info/read/${item.id}`,
								}}
								onClick={() => {
									store_to_local(
										data.title.english || data.title.romaji,
										parseInt(item.chapterNumber),
										parseInt(item.volumeNumber),
										data.image,
										item.id,
										data.id
									);
								}}
							>
								<button key={index}>
									<div>
										<p>Chapter: {item.chapterNumber}</p>
										<p>Volume: {item.volumeNumber}</p>
									</div>
								</button>
							</Link>
						);
					}
				})}
			{!hasValidLinks && (
				<p className={styles.linksNotFound}>Links not found</p>
			)}
		</div>
	);
}
