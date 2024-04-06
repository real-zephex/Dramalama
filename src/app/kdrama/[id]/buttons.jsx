"use client";
import styles from "../styles/info.module.css";
import getVideoLink from "../components/videoLink";
import React, { useState } from "react";
import { MediaPlayer, MediaProvider } from "@vidstack/react";
import "@vidstack/react/player/styles/base.css";
import "@vidstack/react/player/styles/plyr/theme.css";
import {
	PlyrLayout,
	plyrLayoutIcons,
} from "@vidstack/react/player/layouts/plyr";

export default function EpisodesButtons({ data: episodeData, id: dramaId }) {
	const [videoLink, setVideoLink] = useState(null);
	const [episode, setEpisode] = useState("");

	async function test(a, b, episodeText) {
		let link = await getVideoLink(a, b);
		setVideoLink(link);
		setEpisode(episodeText);
	}

	return (
		<div>
			<div className={styles.EpisodesContainer}>
				<h2>Episodes</h2>
				<div className={styles.EpisodeButtons}>
					{episodeData &&
						episodeData.map((item, index) => (
							<button
								key={index}
								onClick={() =>
									test(item.id, dramaId, item.title)
								}
							>
								{item.title}
							</button>
						))}
				</div>
			</div>
			{videoLink && (
				<div className={styles.VideoContainer}>
					<MediaPlayer
						title="dramaPlayer"
						src={videoLink}
						aspectRatio="16/9"
						load="eager"
						className={styles.VideoPlayer}
						playsInline
					>
						<MediaProvider />
						<PlyrLayout icons={plyrLayoutIcons} />
					</MediaPlayer>
					<p>{episode.toUpperCase()}</p>
				</div>
			)}
		</div>
	);
}
