import styles from "./trending.module.css";
import Image from "next/image";
import Link from "next/link";
import { HiTrendingUp } from "react-icons/hi";

export default async function Trending() {
	const data = await test();

	return (
		<div className="trendingContainer">
			<div className={styles.TrendingText}>
				<p>Trending</p>
				<span>
					<HiTrendingUp size={26} color="aqua" />
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
		"https://consumet-api-di2e.onrender.com/anime/gogoanime/top-airing",
		{ cache: "force-cache" }
	);
	const data = res.json();
	return data;
}
