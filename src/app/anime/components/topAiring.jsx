import Link from "next/link";
import Image from "next/image";
import { Lexend_Deca } from "next/font/google";

import styles from "../styles/pop_recent_top.module.css";
import { top_airing } from "../data-fetch/request";
import { preFetchAnimeInfo } from "./cacher";

const lexend = Lexend_Deca({ subsets: ["latin"], weight: "400" });

const TopAiringAnimes = async () => {
	const data = await top_airing();

	preFetchAnimeInfo(data);

	return (
		<main className={styles.Main}>
			<section>
				<h2 className={styles.AnimeHeaderText}>Top Airing Animes</h2>
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
								className={lexend.className}
								title={item.title}
							>
								<section className={styles.AnimeEntry}>
									<Image
										src={item.image}
										width={180}
										height={300}
										alt="Anime Poster Image"
									/>
									<p className={styles.AnimeTitle}>
										{item.title}
									</p>
								</section>
							</Link>
						))}
				</div>
			</section>
		</main>
	);
};

export default TopAiringAnimes;
