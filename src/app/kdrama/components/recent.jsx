import styles from "../styles/popular.module.css";
import Image from "next/image";
import Link from "next/link";
import { PreFetchAnimeInfo } from "./cacher";

export default async function RecentDramas() {
	const popular = await getPopular();
	PreFetchAnimeInfo(popular);
	return (
		<div className={styles.Main}>
			<h2 className={styles.popDramasText}>Recent Releases</h2>

			<div className={styles.AnimeContainer}>
				{popular &&
					popular.results.slice(0, 24).map((item, index) => (
						<Link
							href={`/kdrama/${encodeURIComponent(item.id)}`}
							key={index}
							style={{ textDecoration: "none" }}
						>
							<div
								className={styles.AnimeEntry}
								title={item.title}
							>
								<Image
									src={`https://sup-proxy.zephex0-f6c.workers.dev/api-content?url=${item.image}`}
									width={167}
									height={267}
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
