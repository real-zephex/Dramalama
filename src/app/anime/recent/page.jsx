import Image from "next/image";
import Link from "next/link";
import styles from "./recent.module.css";
import { MdRecentActors } from "react-icons/md";

export default async function Releases() {
	const data = await fetchRecentEpisodes();

	return (
		<div className="trendingContainer">
			<div className={styles.RecentText}>
				<p>Recent Releases</p>
				<span>
					<MdRecentActors size={26} color="aqua" />
				</span>
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
									src={item.image}
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
		"https://consumet-api-di2e.onrender.com/anime/gogoanime/recent-episodes",
		{ next: { revalidate: 86400 } }
	);
	const data = res.json();
	return data;
}
