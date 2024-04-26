import styles from "../styles/popular.module.css";
import Image from "next/image";
import Link from "next/link";
import { PreFetchAnimeInfo } from "./cacher";

export default async function RecentDramas() {
	const popular = await getPopular();
	PreFetchAnimeInfo(popular);
	return (
		<div className={styles.Main}>
			<p className={styles.popDramasText}>Recently Released</p>

			<div className={styles.AnimeContainer}>
				{popular &&
					popular.results.map((item, index) => (
						<Link
							href={`/kdrama/${encodeURIComponent(item.id)}`}
							key={index}
							style={{ textDecoration: "none" }}
						>
							<div className={styles.AnimeEntry}>
								<Image
									src={`https://sup-proxy.zephex0-f6c.workers.dev/api-content?url=${item.image}`}
									width={160}
									height={240}
									alt="Drama Poster"
								/>
								<p>{item.title}</p>
							</div>
						</Link>
					))}
			</div>
		</div>
	);
}

async function getPopular() {
	const res = await fetch("https://dramacool-scraper.vercel.app/recent", {
		next: { revalidate: 21600 },
	});
	const data = await res.json();
	return data;
}
