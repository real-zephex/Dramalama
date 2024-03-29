"use client";

import styles from "./info.module.css";
import Link from "next/link";

export default function Buttons({ content: data }) {
	return (
		<div className={styles.ChapterContainer}>
			{data.chapters &&
				data.chapters.map((item, index) => {
					if (item.pages !== 0) {
						return (
							<Link
								key={index}
								href={{
									pathname: `/manga/info/read/${item.id}`,
								}}
								onClick={() =>
									test(item.chapterNumber, item.volumeNumber)
								}
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
		</div>
	);
}

function test(chapter, volume) {
	localStorage.setItem("chapter", chapter);
	localStorage.setItem("volume", volume);
}
