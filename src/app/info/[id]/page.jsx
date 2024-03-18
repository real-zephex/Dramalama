import "../info.css";
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
								width={140}
								height={190}
								alt="Drama"
							/>
						</div>
						<p className="dramaDescription">{info.description}</p>
					</div>
				)}

				<div className="buttonContainer">
					{info &&
						info.episodes.map((item, index) => (
							<Link href={`/video/${item.id}`} key={index}>
								<button className="dramaButton">
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
		"https://anime-sensei-api.vercel.app/anime/gogoanime/info/" + anime_id
	);
	const data = res.json();
	return data;
}
