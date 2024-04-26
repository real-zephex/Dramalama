import styles from "./trending.module.css";
import Image from "next/image";
import Link from "next/link";
import { preFetchAnimeInfo } from "../videoLinkfetcher";

export const runtime = "edge";

export default async function Trending() {
	const data = await test();
	preFetchAnimeInfo(data);
	return (
		<div className={styles.TrendingContainer}>
			<div className={styles.TrendingText}>
				<p>Trending</p>
			</div>

			<div className={styles.trending}>
				{data &&
					data.results.map((item, index) => (
						<Link
							key={index}
							href={`/anime/${item.id}`}
							style={{ textDecoration: "none", color: "white" }}
						>
							<div className={styles.trendingEntries}>
								<Image
									src={`https://sup-proxy.zephex0-f6c.workers.dev/api-content?url=${item.image}`}
									className={styles.trendingImage}
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

async function test() {
	const res = await fetch(
		"https://consumet-jade.vercel.app/anime/gogoanime/top-airing",
		{ next: { revalidate: 21600 } }
	);
	const data = res.json();
	return data;
}
