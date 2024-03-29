import "./recent.css";
import Image from "next/image";
import Link from "next/link";
import styles from "./recent.module.css";
import { MdRecentActors } from "react-icons/md";

export default async function Releases() {
	const data = await test();

	return (
		<div className="trendingContainer">
			<div className={styles.RecentText}>
				<p>Recent Releases</p>
				<span>
					<MdRecentActors size={26} color="aqua" />
				</span>
			</div>

			<div className="trending">
				{data &&
					data.results.map((item, index) => (
						<Link
							key={index}
							href={`/anime/${item.id}`}
							style={{ textDecoration: "none" }}
						>
							<div className="trendingEntries">
								<Image
									src={item.image}
									className="{trendingImage}"
									width={160}
									height={220}
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
		"https://consumet-api-di2e.onrender.com/anime/gogoanime/recent-episodes",
		{ cache: "force-cache" }
	);
	const data = res.json();
	return data;
}
