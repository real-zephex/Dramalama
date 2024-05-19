import Image from "next/image";
import { SERIES_INFO, CREW_DETAILS } from "../components/data-fetch";
import styles from "../styles/info.module.css";
import { BiSolidUpvote } from "react-icons/bi";
import { LiaStarSolid } from "react-icons/lia";
import SeriesPlayer from "../components/videoPlayer";

const SeriesInfoPage = async ({ params }) => {
	const id = params.id;
	const data = await FetchSeriesInfo(id);
	const crew_data = await CREW_DETAILS(id);
	return (
		<main
			style={{
				// backgroundImage: `url(https://sup-proxy.zephex0-f6c.workers.dev/api-content?url=https://image.tmdb.org/t/p/original${data.backdrop_path})`,
				background: `linear-gradient(to bottom, rgba(0, 0, 0, 0) 70%, rgba(0, 0, 0, 1) 100%), 
                url(https://sup-proxy.zephex0-f6c.workers.dev/api-content?url=https://image.tmdb.org/t/p/original${data.backdrop_path}) no-repeat center center fixed`,
				backgroundSize: "cover",
			}}
			className={styles.Main}
		>
			<div className={styles.AnimeInfo}>
				<section className={styles.AnimeInfoContainer}>
					<div className={styles.TitleContainer}>
						<Image
							src={`https://sup-proxy.zephex0-f6c.workers.dev/api-content?url=https://image.tmdb.org/t/p/original${data.poster_path}`}
							width={190}
							height={290}
							alt="Series Poster"
							priority
						/>
						<section className={styles.SideTitleContainer}>
							<h2 className={styles.title}>{data.name}</h2>
							<p className={styles.secondTitle}>
								{data.original_name}
							</p>
							<p className={styles.tagline}>
								<span>{data.tagline || "not found"}</span>
							</p>
							<p className={styles.description}>
								{" "}
								{data.overview}
							</p>
							<hr />
							<p className={styles.genres}>
								Genres:{" "}
								{data.genres.map((item, index) => (
									<span key={index}>
										{item.name}
										{index !== data.genres.length - 1 &&
											", "}
									</span>
								))}
							</p>
							<p className={styles.epiInfo}>
								Seasons: <span>{data.number_of_seasons}</span>
							</p>
							<p className={styles.epiInfo}>
								Episodes: <span>{data.number_of_episodes}</span>
							</p>
							<div className={styles.votes}>
								<section className={styles.vote}>
									<BiSolidUpvote color="var(--nord-green)" />{" "}
									<p>{data.vote_count}</p>
								</section>
								<section className={styles.vote}>
									<LiaStarSolid color="var(--nord-green)" />{" "}
									<p>{data.vote_average}</p>
								</section>
							</div>
						</section>
					</div>
					<section className={styles.CrewContainer}>
						<h2>Crew</h2>
						<div className={styles.CrewEntry}>
							{crew_data &&
								crew_data.cast.map((item, index) => (
									<div
										key={index}
										className={styles.CastEntry}
									>
										<Image
											src={`https://sup-proxy.zephex0-f6c.workers.dev/api-content?url=https://image.tmdb.org/t/p/original${item.profile_path}`}
											width={140}
											height={190}
											alt="Crew Poster"
										/>
										<p>{item.name}</p>
										<p style={{ fontSize: 11 }}>
											{item.character}
										</p>
									</div>
								))}
						</div>
					</section>

					<section className={styles.VideoContainer}>
						<SeriesPlayer id={data.id} />
					</section>
				</section>
			</div>
		</main>
	);
};

const FetchSeriesInfo = async (id) => {
	const data = SERIES_INFO(id);
	return data;
};

export default SeriesInfoPage;
