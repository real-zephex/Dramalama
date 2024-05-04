import styles from "../styles/info.module.css";
import Image from "next/image";
import EpisodesButtons from "./buttons";
import { PreFetchVideoLinks } from "../components/cacher";

export default async function DramaInfo({ params }) {
	const id = decodeURIComponent(params.id);
	const info = await getDramaInfo(id);

	PreFetchVideoLinks(info.episodes, id);

	return (
		<div className={styles.Main}>
			{info && (
				<div className={styles.DramaInfoContainer}>
					<div className={styles.TitleContainer}>
						<p>{info.title}</p>
						<Image
							src={`https://sup-proxy.zephex0-f6c.workers.dev/api-content?url=${info.image}`}
							width={175}
							height={256}
							alt="Drama Poster"
							priority
						/>
					</div>

					{/* Drama description */}
					<div className={styles.DramaDescription}>
						<h2>Description</h2>
						<p>{info.description}</p>
					</div>

					{/* Genres */}
					<div className={styles.DramaGenre}>
						<span className={styles.genreMain}>Genres: </span>
						{info.genres &&
							info.genres.map((item, index) => (
								<p key={index}>{item}</p>
							))}
					</div>

					{/* Other names */}
					<div className={styles.DramaGenre}>
						<span className={styles.genreMain}>AKA: </span>
						{info.otherNames &&
							info.otherNames.map((item, index) => (
								<p key={index}>{item}</p>
							))}
					</div>

					{/* Episodes Buttons */}
					<EpisodesButtons data={info.episodes} id={id} />
				</div>
			)}
		</div>
	);
}

async function getDramaInfo(id) {
	const res = await fetch(
		`https://consumet-jade.vercel.app/movies/dramacool/info?id=${id}`,
		{ next: { revalidate: 21600 } }
	);
	const data = await res.json();
	return data;
}
