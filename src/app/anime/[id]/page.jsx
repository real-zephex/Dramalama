import Image from "next/image";

import { anime_info } from "../data-fetch/request";
import styles from "../styles/info.module.css";
import EpisodesButtons from "../components/episode_buttons";

import { preFetchVideoLinks } from "../components/cacher";

const AnimeInfoHomepage = async ({ params }) => {
	const id = params.id;
	const data = await anime_info(id);

	const sliceLength = Math.min(data.episodes.length, 49);
	preFetchVideoLinks(data.episodes.slice(0, sliceLength));

	return (
		<main className={styles.main}>
			<div>
				{data && (
					<section className={styles.AnimeInfo}>
						<div className={styles.AnimeHeroSection}>
							<Image
								src={data.image}
								width={200}
								height={300}
								alt="Anime Poster"
								priority
							/>
							<div>
								<p className={styles.animeTitle}>
									<strong
										style={{ color: "var(--neon-green)" }}
									>
										{data.title || "Not Found"}
									</strong>
								</p>
								<p className={styles.animeDescription}>
									<strong>Description: </strong>
									{data.description || "Not Found"}
								</p>
								<hr style={{ borderColor: "gray" }} />
								<span>
									<strong style={{ marginRight: 5 }}>
										Genres:
									</strong>
									{data.genres &&
										data.genres.map((item, index) => (
											<span key={index}>
												{item}
												{index !==
													data.genres.length - 1 &&
													", "}
											</span>
										))}
								</span>
								<p>
									<strong>Episodes:</strong>{" "}
									{data.totalEpisodes || "Not Found"}
								</p>
								<p>
									<strong>Release year:</strong>{" "}
									{data.releaseDate || "Not Found"}
								</p>
								<p>
									<strong>Status:</strong>{" "}
									{data.status || "Not Found"}
								</p>
								<p>
									<strong>Type:</strong>{" "}
									{data.type || "Not Found"}
								</p>
							</div>
						</div>
					</section>
				)}
			</div>
			<EpisodesButtons data={data} />
		</main>
	);
};

export default AnimeInfoHomepage;
