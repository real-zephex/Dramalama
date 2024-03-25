import styles from "./info.module.css";
import Image from "next/image";
import Buttons from "./buttons";

export default async function MangaInfo({ params }) {
	const id = params.id;
	const data = await getMangaInfo(id);

	return (
		<div className={styles.MangaInfoContainer}>
			{data && (
				<div className={styles.MangaInfo}>
					<div className={styles.MangaHero}>
						<Image
							src={data.cover}
							width={1730}
							height={400}
							alt="Cover Poster"
							className={styles.HeroImage}
							priority
						/>
						<div className={styles.TitleContainer}>
							<p
								style={{
									color: data.color,
									backgroundColor: "#3a3a3ac2",
									borderRadius: 10,
									padding: 5,
								}}
							>
								{data.title["romaji"]}
							</p>
							<Image
								src={data.image}
								width={200}
								height={310}
								alt="Manga Poster"
								priority
							/>
						</div>
					</div>

					<div className={styles.MangaDescription}>
						<p>{data.description.split("<br")[0]}</p>
						<span className={styles.MangaReleaseYear}>
							Released in: {data.releaseDate}
						</span>
						<span>
							Started on: {data.startDate["day"]}-
							{data.startDate["month"]}-{data.startDate["year"]}
						</span>
						<span>
							Ended on: {data.endDate["day"]}-
							{data.endDate["month"]}-{data.endDate["year"]}
						</span>
						<p className={styles.MangaRatings}>
							Ratings: {data.rating / 10}
						</p>
						<p style={{ color: "#7ED7C1" }}>
							Genres:
							{data.genres &&
								data.genres.map((item, index) => (
									<span
										key={index}
										className={styles.MangaGenre}
										style={{ color: data.color, margin: 5 }}
									>
										{item}
									</span>
								))}
						</p>
					</div>

					<div className={styles.CharactersContainer}>
						<div className={styles.Character}>
							{data.characters &&
								data.characters.map((item, index) => (
									<div
										key={index}
										className={styles.CharacterEntry}
									>
										<Image
											src={item.image}
											width={140}
											height={200}
											alt="Character Poster"
										/>
										<p>
											{item.name.full} ({item.role})
										</p>
									</div>
								))}
						</div>
					</div>

					<Buttons content={data} />
				</div>
			)}
		</div>
	);
}

async function getMangaInfo(id) {
	const res = await fetch(
		`https://consumet-api-di2e.onrender.com/meta/anilist-manga/info/${id}?provider=mangadex`
	);
	const data = await res.json();
	return data;
}
