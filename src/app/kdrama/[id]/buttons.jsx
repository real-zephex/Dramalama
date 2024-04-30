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
									event.currentTarget.style.backgroundColor =
										"var(--soft-purple)";
								}}
							>
								<p>{item.title}</p>
							</button>
						))}
				</div>
			</div>

			{videoLink && (
				<div
					className={styles.videoPopUp}
					id="popup"
					onKeyDown={(event) => {
						if (event.code === "Escape") {
							setVideoLink("");
						}
					}}
				>
					<div className={styles.video}>
						<MediaPlayer
							title="dramaPlayer"
							src={videoLink}
							aspectRatio="16/9"
							load="eager"
							className={styles.VideoPlayer}
							playsInline
							id="videoPlayer"
							volume={0.8}
						>
							<MediaProvider />
							<PlyrLayout icons={plyrLayoutIcons} />
						</MediaPlayer>
						<button
							className={styles.closeButton}
							onClick={() => {
								setVideoLink("");
							}}
						>
							Close
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
