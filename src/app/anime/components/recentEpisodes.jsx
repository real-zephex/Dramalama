import Link from "next/link";
import Image from "next/image";
import { Atkinson_Hyperlegible } from "next/font/google";

import styles from "../styles/pop_recent_top.module.css";
import { recent } from "../data-fetch/request";
import { preFetchAnimeInfo } from "./cacher";

const atkinson = Atkinson_Hyperlegible({ subsets: ["latin"], weight: "400" });

const RecentAnimes = async () => {
	const data = await recent();

	preFetchAnimeInfo(data);

	return (
		<main className={styles.Main}>
			<section>
				<h2 className={styles.AnimeHeaderText}>Recent Releases</h2>
				<div className={styles.AnimeContainer}>
					{data &&
						data.results.map((item, index) => (
							<Link
								key={index}
								href={`/anime/${item.id}`}
								shallow
								style={{
									color: "white",
									textDecoration: "none",
								}}
								className={atkinson.className}
								title={item.title}
							>
								<section className={styles.AnimeEntry}>
									<Image
										src={item.image}
										width={167}
										height={267}
										alt="Anime Poster Image"
									/>
									<p>{item.title}</p>
									<p className={styles.EpisodeText}>
										Episode: {item.episodeNumber}
									</p>
								</section>
							</Link>
						))}
				</div>
			</section>
		</main>
	);
};

export default RecentAnimes;
