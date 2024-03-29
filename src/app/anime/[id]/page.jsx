import "./info.css";
import Image from "next/image";
import Link from "next/link";

export default async function AnimeInfo({ params }) {
	let animeID = params.id;

	const info = await getAnimeInfo(animeID);

	return (
		<div className="dramaInfoContainer">
			<div className="dramaInfo">
				{info && (
					<div>
						<div className="titleContainer">
							<p>{info.title}</p>
							<Image
								src={info.image}
								width={150}
								height={200}
								alt="Drama"
							/>
						</div>
						<p className="animeDescription">{info.description}</p>
					</div>
				)}

				<div className="animeDetails">
					<span>Genres: </span>
					{info.genres &&
						info.genres.map((item, index) => (
							<span className="genreEntries" key={index}>
								{item}
							</span>
						))}
					<p className="animeType">
						Type: <span>{info.type}</span>
					</p>
					<p className="animeRelease">
						Release year:{" "}
						<span>
							{info.releaseDate}, {info.status}
						</span>
					</p>
				</div>

				<div className="buttonContainer">
					{info &&
						info.episodes.map((item, index) => (
							<Link href={`/anime/watch/${item.id}`} key={index}>
								<button className="dramaButton">
									<span>Episode </span>
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
		{ next: { revalidate: 1800 } }
	);
	const data = res.json();
	return data;
}
