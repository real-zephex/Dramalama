import styles from "./title.module.css";
import Image from "next/image";
import Link from "next/link";
import { PreFetchMangaInfo } from "../cacher";

export default async function MangaInfo({ params }) {
	const title = params.title;
	const data = await GetSearchedAnime(title);

	PreFetchMangaInfo(data);

	return (
		<div className={styles.Main}>
			<div className={styles.MangaContainer}>
				{title && (
					<div className={styles.SearchedFor}>
						<p>Searched for: {decodeURIComponent(title)}</p>
					</div>
				)}
				{data &&
					data.results.map(async (item, index) => {
						let desc = item.description || ""; // Ensure desc is not null
						if (desc === "") {
							desc = "Not found"; // If desc is empty, set it to "Not found"
						}
						return (
							<Link
								href={`./info/${item.id}`}
								style={{ textDecoration: "none" }}
								key={index}
							>
								<div className={styles.MangaEntries}>
									<Image
										src={`https://sup-proxy.zephex0-f6c.workers.dev/api-content?url=${item.image}`}
										width={180}
										height={270}
										alt="Manga Poster"
									/>
									<div className={styles.MangaInfo}>
										<p className={styles.MangaTitle}>
											{item.title["english"] ||
												item.title["romaji"]}
										</p>
										<p className={styles.MangaDescription}>
											{desc.includes &&
											desc.includes("<br")
												? desc.split("<b")[0]
												: desc}
										</p>
										<p className={styles.MangaStatus}>
											Status: {item.status || "not sure"}
										</p>
										<p className={styles.MangaChapters}>
											Chapters:{" "}
											{item.totalChapters || "not sure"}
										</p>
										<p className={styles.MangaVolume}>
											Volumes:{" "}
											{item.volumes || "not sure"}
										</p>
									</div>
								</div>
							</Link>
						);
					})}
			</div>
		</div>
	);
}

async function GetSearchedAnime(title) {
	const res = await fetch(
		"https://consumet-jade.vercel.app/meta/anilist-manga/" + title
	);
	const data = await res.json();
	return data;
}
