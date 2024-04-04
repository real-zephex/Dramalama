import styles from "../styles/info.module.css";
import Image from "next/image";
export default async function DramaInfo({ params }) {
	const id = decodeURIComponent(params.id);
	const info = await getDramaInfo(id);

	return (
		<div className={styles.Main}>
			{info && (
				<div className={styles.DramaInfoContainer}>
					<div className={styles.TitleContainer}>
						<p>{info.title}</p>
						<Image
							src={info.image}
							width={160}
							height={240}
							alt="Drama Poster"
							priority
						/>
					</div>

					<div className={styles.DramaDescription}>
						<h2>Description</h2>
						<p>{info.description}</p>
					</div>

					{/* Genres */}
					<div className={styles.DramaGenre}>
						<span className={styles.genreMain}>Genres: </span>
						{info.genres &&
							info.genres.map((item, index) => (
								<span key={index} className={styles.genreEntry}>
									{item}
								</span>
							))}
					</div>

					{/* Other names */}
					<div className={styles.DramaGenre}>
						<span className={styles.genreMain}>AKA: </span>
						{info.otherNames &&
							info.otherNames.map((item, index) => (
								<span key={index} className={styles.genreEntry}>
									{item}
								</span>
							))}
					</div>
				</div>
			)}
		</div>
	);
}

async function getDramaInfo(id) {
	const res = await fetch(
		`https://consumet-api-di2e.onrender.com/movies/dramacool/info?id=${id}`
	);
	const data = await res.json();
	return data;
}
