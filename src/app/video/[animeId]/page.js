import { MediaPlayer, MediaProvider } from "@vidstack/react";
import "@vidstack/react/player/styles/base.css";
import "@vidstack/react/player/styles/plyr/theme.css";
import {
	PlyrLayout,
	plyrLayoutIcons,
} from "@vidstack/react/player/layouts/plyr";
import "../video.css";

export default async function Video({ params }) {
	const id = params.animeId;
	const words = id.split("-");
	const last_two = words.slice(-2).join(" ");
	const remainingWords = words.slice(0, -2).join(" ");
	const data = await getVideoLink(id);
	const link = data.sources[3].url;

	return (
		<div>
			<div className="video2">
				<p>
					{last_two} - {remainingWords}
				</p>
				<MediaPlayer
					title="Test Player"
					src={link}
					className="testPlayer"
					playsInline
					aspectRatio="16/9"
					load="eager"
				>
					<MediaProvider />
					<PlyrLayout
						thumbnails="https://image.mux.com/VZtzUzGRv02OhRnZCxcNg49OilvolTqdnFLEqBsTwaxU/storyboard.vtt"
						icons={plyrLayoutIcons}
					/>
				</MediaPlayer>
			</div>
		</div>
	);
}

async function getVideoLink(id) {
	const res = await fetch(
		"https://anime-sensei-api.vercel.app/anime/gogoanime/watch/" + id
	);
	const data = res.json();
	return data;
}
