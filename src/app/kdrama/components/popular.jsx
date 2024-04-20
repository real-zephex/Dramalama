import styles from "../styles/popular.module.css";
import Image from "next/image";
import Link from "next/link";
import { PreFetchAnimeInfo } from "./cacher";

export default async function PopularDramas() {
	const popular = await getPopular();
	PreFetchAnimeInfo(popular);

	return (
		<div className={styles.Main}>
			<p className={styles.popDramasText}>Trending Dramas</p>

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
									width={150}
									height={230}
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
	const res = await fetch("https://dramacool-scraper.vercel.app/popular", {
		next: { revalidate: 33200 },
	});
	const data = await res.json();
	return data;
}
