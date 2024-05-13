"use client";
import styles from "../styles/info.module.css";
import getVideoLink from "../components/videoLink";
import React, { useState } from "react";
import { MediaPlayer, MediaProvider } from "@vidstack/react";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import {
	defaultLayoutIcons,
	DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";

export default function EpisodesButtons({ data: episodeData, id: dramaId }) {
	const [videoLink, setVideoLink] = useState(null);

	async function test(a, b) {
		let link = await getVideoLink(a, b);
		setVideoLink(link);
	}

	return (
		<div>
			<div className={styles.EpisodesContainer}>
				<h2>Episodes</h2>
				<div className={styles.EpisodeButtons}>
					{episodeData && episodeData.length > 0 ? (
						episodeData.map((item, index) => (
							<button
								title={item.title}
								key={index}
								onClick={(event) => {
									test(item.id, dramaId, item.title);
									event.currentTarget.style.backgroundColor =
										"var(--soft-purple)";
								}}
							>
								<p>{item.title}</p>
							</button>
						))
					) : (
						<p style={{ color: "white" }}>
							No episodes are available at the moment but they
							will be made available soon. Thank you for your
							patience.
						</p>
					)}
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
							load="eager"
							className={styles.VideoPlayer}
							playsInline
							id="videoPlayer"
							volume={0.8}
						>
							<MediaProvider />
							<DefaultVideoLayout icons={defaultLayoutIcons} />
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
