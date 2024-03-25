import styles from "./title.module.css";
import Image from "next/image";
import Link from "next/link";

export default async function MangaInfo({ params }) {
	const title = params.title;
	const data = await GetSearchedAnime(title);

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
										src={item.image}
										width={140}
										height={240}
										alt="Manga Poster"
										style={{ borderRadius: 10 }}
									/>
									<div className={styles.MangaInfo}>
										<p className={styles.MangaTitle}>
											{item.title["romaji"]},{" "}
											{item.title["english"]},{" "}
											{item.title["native"]}
										</p>
										<p className={styles.MangaDescription}>
											{desc.includes &&
											desc.includes("<br")
												? desc.split("<b")[0]
												: desc}
										</p>
										<p className={styles.MangaStatus}>
											{item.status}
										</p>
										<p className={styles.MangaChapters}>
											Chapters: {item.totalChapters}
										</p>
										<p className={styles.MangaVolume}>
											Volumes: {item.volumes}
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
		"https://consumet-api-di2e.onrender.com/meta/anilist-manga/" + title
	);
	const data = await res.json();
	return data;
}
