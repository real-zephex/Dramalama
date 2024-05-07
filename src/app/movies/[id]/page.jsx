import styles from "../styles/info.module.css";
import { getInfoURL } from "../../../../utils/movie_urls";
import Image from "next/image";
import { PiThumbsUpFill } from "react-icons/pi";
import { FaRegCheckCircle } from "react-icons/fa";
import { RxDividerVertical } from "react-icons/rx";
import { FaDollarSign } from "react-icons/fa";
import { FaSackDollar } from "react-icons/fa6";
import VIDEO_PLAYER from "../components/video_player";

export default async function MOVIE_INFO({ params }) {
	const id = params.id;
	const data = await get_movie_info(id);

	return (
		<main
			style={{
				backgroundImage: `url(https://sup-proxy.zephex0-f6c.workers.dev/api-content?url=https://image.tmdb.org/t/p/original${data.backdrop_path})`,
				backgroundRepeat: "no-repeat",
				backgroundSize: "cover",
			}}
			className={styles.Main}
		>
			<section className={styles.MovieInfoSection}>
				<section className={styles.MovieInfo}>
					<div className={styles.HeroSection}>
						<Image
							src={`https://sup-proxy.zephex0-f6c.workers.dev/api-content?url=https://image.tmdb.org/t/p/original${data.poster_path}`}
							width={200}
							height={300}
							alt="Movie Poster"
							priority
						></Image>
						<div className={styles.HeroTitle}>
							<h2>{data.title || "Not found"}</h2>
							<p className={styles.tagline}>
								<span>{data.tagline || "Not found"}</span>
							</p>
							<p className={styles.MovieDescription}>
								{data.overview || "Not found"}
							</p>
						</div>
					</div>
					<div className={styles.OtherInfo}>
						<section className={styles.Ratings}>
							<span>
								<PiThumbsUpFill size={16} />
								<p>{data.vote_average || "Not found"}</p>
							</span>
							<span className={styles.divider}>
								<RxDividerVertical size={22} />
							</span>
							<span>
								<FaRegCheckCircle size={16} />
								<p>{data.vote_count || "Not found"}</p>
							</span>
						</section>
						<section className={styles.Money}>
							<span title="revenue">
								<FaSackDollar />
								<p>
									$
									{data.revenue.toLocaleString() ||
										"Not found"}
								</p>
							</span>
							<span className={styles.divider}>
								<RxDividerVertical size={22} />
							</span>
							<span title="budget">
								<FaDollarSign />
								<p>
									$
									{data.budget.toLocaleString() ||
										"Not found"}
								</p>
							</span>
						</section>
						<section className={styles.Money}>
							<span title="Released on">
								<p>
									Release Date:{" "}
									{data.release_date || "Not found"}
								</p>
							</span>
						</section>
						<section className={styles.Genre}>
							{data.genres.map((item) => (
								<p key={item.id}>{item.name || "Not found"}</p>
							))}
						</section>
					</div>
					<section className={styles.VideoPlayer}>
						<VIDEO_PLAYER id={id} />
						<p
							style={{
								textAlign: "center",
								margin: 0,
								fontSize: 12,
							}}
						>
							IMPORTANT: Please use adblockers like uBlock Orgin
							or Ghostery for an ad free experience.
						</p>
					</section>
					<br />
					<br />
				</section>
			</section>
		</main>
	);
}

const get_movie_info = async (id) => {
	const res = await fetch(getInfoURL(id), { next: { revalidate: 21620 } });
	const data = await res.json();
	return data;
};
