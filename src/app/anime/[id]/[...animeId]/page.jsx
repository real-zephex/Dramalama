import { MediaPlayer, MediaProvider } from "@vidstack/react";
import "@vidstack/react/player/styles/base.css";
import "@vidstack/react/player/styles/plyr/theme.css";
import {
	PlyrLayout,
	plyrLayoutIcons,
} from "@vidstack/react/player/layouts/plyr";
import styles from "./video.module.css";
import { redirect } from "next/navigation";
import Link from "next/link";

export const runtime = 'edge';

export default async function Video({ params }) {
	let link;
	const id = params.animeId[0];
	const series = params.animeId[1];

	// Getting the episode number and the anime name. Kindly ignore!
	const words = id.split("-");
	const last_two = words.slice(-2).join(" ");
	const remainingWords = words.slice(0, -2).join(" ");

	const data = await getVideoLink(id);
	const animedata = await getAnimeInfo(series);

	if (data.message) {
		redirect("/404");
	}

	try {
		link = data.sources[4].url;
	} catch (error) {
		try {
			link = data.sources[3].url;
		} catch (error) {
			console.log("Episode not found.");
			redirect("/404");
		}
	}

	return (
		<div className={styles.VideoMain}>
			<div className={styles.VideoContainer}>
				<p style={{ textAlign: "center", color: "white" }}>
					{last_two} - {remainingWords}
				</p>
				<div className={styles.Video}>
					<MediaPlayer
						title={words}
						src={link}
						aspectRatio="16/9"
						load="eager"
						className={styles.VideoPlayer}
					>
						<MediaProvider />
						<PlyrLayout icons={plyrLayoutIcons} />
					</MediaPlayer>
					<div className={styles.EpisodesButtons}>
						{animedata &&
							animedata.episodes.map((item, index) => (
								// <p key={index}>Hello World</p>
								<Link
									href={`/anime/watch/${item.id}/${series}`}
									key={index}
								>
									<button>{item.number}</button>
								</Link>
							))}
					</div>
				</div>
			</div>
		</div>
	);
}

async function getVideoLink(id) {
	const res = await fetch(
		"https://consumet-api-di2e.onrender.com/anime/gogoanime/watch/" + id
	);
	const data = res.json();
	return data;
}

async function getAnimeInfo(anime_id) {
	const res = await fetch(
		"https://anime-sensei-api.vercel.app/anime/gogoanime/info/" + anime_id,
		{ next: { revalidate: 7200 } }
	);
	const data = await res.json();
	return data;
}
