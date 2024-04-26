import styles from "./info.module.css";
import Image from "next/image";
import Button from "./buttons";
import { preFetchAnimeLinks } from "../videoLinkfetcher";

export const runtime = "edge";

export default async function AnimeInfo({ params }) {
	let animeID = params.id;

	const info = await getAnimeInfo(animeID);

	preFetchAnimeLinks(info);

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
								priority
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
					{info.genres &&
						info.genres.map((item, index) => (
							<span className={styles.genreEntries} key={index}>
								{item}
							</span>
						))}
					<p className={styles.animeType}>
						Type: <span>{info && info.type}</span>
					</p>
					<p className={styles.animeRelease}>
						Release year:
						<span>
							{info && info.releaseDate}, {info && info.status}
						</span>
					</p>
				</div>

				<Button data2={info} />
			</div>
		</div>
	);
}

async function getAnimeInfo(anime_id) {
	const res = await fetch(
		"https://consumet-jade.vercel.app/anime/gogoanime/info/" + anime_id,
		{ next: { revalidate: 7200 } }
	);
	const data = await res.json();
	return data;
}
