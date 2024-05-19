"use client";

import { useState } from "react";
import styles from "../styles/videoPlayer.module.css";

const SeriesPlayer = ({ id: id }) => {
	const [iframe, iframeContent] = useState(null);
	const [episode, setEpisode] = useState("");
	const [season, setSeason] = useState("");

	async function VideoPlayerInitialize() {
		if (!episode || !season) {
			alert("Please provide the required episode and season number.");
			return;
		}
		iframeContent(await iframeGenerator(id, season, episode));
		document.getElementById("video-player").style.display = "none";
	}

	return (
		<main className={styles.Main}>
			<div className={styles.EpisodeSeasonInput}>
				<input
					name="Season"
					type="number"
					placeholder="Season Number"
					onChange={(e) => {
						if (Number(e.target.value) > 0) {
							setSeason(e.target.value);
						}
					}}
				></input>
				<input
					name="Episode"
					type="number"
					placeholder="Episode Number"
					onChange={(e) => {
						if (Number(e.target.value) > 0) {
							setEpisode(e.target.value);
						}
					}}
				></input>

				<button onClick={() => VideoPlayerInitialize(id)}>
					Search
				</button>
			</div>

			<div className={styles.VideoPlayer}>
				{iframe}
				<p id="video-player">
					Please use adblockers to prevent ads and redirects. We have
					no control over the amount of ads or the type of ads which
					you might encounter.
				</p>
			</div>
		</main>
	);
};

const iframeGenerator = async (id, seasonNumber, episodeNumber) => {
	const url = `https://vidsrc.pro/embed/tv/${id}/${seasonNumber}/${episodeNumber}`;
	return <iframe src={url} allowFullScreen referrerPolicy="origin"></iframe>;
};

export default SeriesPlayer;
