import styles from "./info.module.css";
import Image from "next/image";
import Link from "next/link";

export default async function AnimeInfo({ params }) {
	let animeID = params.id;

	const info = await getAnimeInfo(animeID);

	return (
		<div className={styles.dramaInfoContainer}>
			<div className={styles.dramaInfo}>
				{info && (
					<div>
						<div className={styles.titleContainer}>
							<p>{info.title}</p>
							<Image
								src={info.image}
								width={175}
								height={256}
								alt="Drama"
							/>
						</div>
						<div className={styles.animeDescription}>
							<h2>Description</h2>
							<p>{info.description}</p>
						</div>
					</div>
				)}

				<div className={styles.animeDetails}>
					<span className={styles.genre}>Genres: </span>
					{info &&
						info.genres &&
						info.genres.map((item, index) => (
							<span className={styles.genreEntries} key={index}>
								{item}
							</span>
						))}
					<p className={styles.animeType}>
						Type: <span>{info && info.type}</span>
					</p>
					<p className={styles.animeRelease}>
						Release year:{" "}
						<span>
							{info && info.releaseDate}, {info && info.status}
						</span>
					</p>
				</div>

				<h2 className={styles.buttonHeader}>Episodes: </h2>
				<div className={styles.buttonContainer}>
					{info &&
						info.episodes &&
						info.episodes.map((item, index) => (
							<Link
								href={`/anime/watch/${item.id}/${animeID}`}
								key={index}
							>
								<button className={styles.dramaButton}>
									{item.number}
								</button>
							</Link>
						))}
				</div>
			</div>
		</div>
	);
}

async function getAnimeInfo(anime_id) {
	const res = await fetch(
		"https://anime-sensei-api.vercel.app/anime/gogoanime/info/" + anime_id,
		{ next: { revalidate: 7200 } }
	);
	const data = await res.json();
	return data;
}
