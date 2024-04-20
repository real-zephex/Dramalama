import Image from "next/image";
import Link from "next/link";
import styles from "./recent.module.css";
import { preFetchAnimeInfo } from "../videoLinkfetcher";

export default async function Releases() {
	const data = await fetchRecentEpisodes();
	preFetchAnimeInfo(data);

	return (
		<div className={styles.RecentContainer}>
			<div className={styles.RecentText}>
				<p>Recent Releases</p>
			</div>

			<div className={styles.Recent}>
				{data &&
					data.results.map((item, index) => (
						<Link
							key={index}
							href={`/anime/${item.id}`}
							style={{ textDecoration: "none", color: "white" }}
						>
							<div className={styles.RecentEntries}>
								<Image
									src={`https://sup-proxy.zephex0-f6c.workers.dev/api-content?url=${item.image}`}
									className={styles.RecentImage}
									width={150}
									height={230}
									alt="Drama"
									priority
								/>
								<p>{item.title}</p>
							</div>
						</Link>
					))}
			</div>
		</div>
	);
}

async function fetchRecentEpisodes() {
	const res = await fetch(
		"https://consumet-jade.vercel.app/anime/gogoanime/recent-episodes",
		{ next: { revalidate: 86400 } }
	);
	const data = res.json();
	return data;
}
