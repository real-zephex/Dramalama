"use client";
import styles from "../styles/info.module.css";
import getVideoLink from "../components/videoLink";
import React, { useEffect, useState } from "react";
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

	// Auto loads the first episode
	useEffect(() => {
		const fetchData = async () => {
			try {
				let firstVideoLink = episodeData[0].id;
				let firstLink = await getVideoLink(firstVideoLink, dramaId);
				setVideoLink(firstLink);
				setEpisode("Episode 1");
			} catch (error) {
				console.log("Some error occured", error);
				return;
			}
		};

		fetchData();
	}, []);

	return (
		<div>
			<div className={styles.EpisodesContainer}>
				<h2>Episodes</h2>
				<div className={styles.EpisodeButtons}>
					{episodeData &&
						episodeData.map((item, index) => (
							<button
								key={index}
								onClick={(event) => {
									test(item.id, dramaId, item.title);
									event.target.style.backgroundColor =
										"var(--soft-purple)";
								}}
							>
								{item.title}
							</button>
						))}
				</div>
			</div>

			<div className={styles.VideoContainer}>
				{videoLink && (
					<div className={styles.Video}>
						<MediaPlayer
							title="dramaPlayer"
							src={videoLink}
							aspectRatio="16/9"
							load="eager"
							className={styles.VideoPlayer}
							playsInline
							volume={0.5}
						>
							<MediaProvider />
							<PlyrLayout icons={plyrLayoutIcons} />
						</MediaPlayer>
						<p>{episode}</p>
					</div>
				)}
			</div>
		</div>
	);
}
