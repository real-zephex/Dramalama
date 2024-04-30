"use client";

import styles from "./info.module.css";
import { useState } from "react";
import { fetch_video_link } from "../videoLinkfetcher";
import { MediaPlayer, MediaProvider } from "@vidstack/react";
import "@vidstack/react/player/styles/base.css";
import "@vidstack/react/player/styles/plyr/theme.css";
import {
	PlyrLayout,
	plyrLayoutIcons,
} from "@vidstack/react/player/layouts/plyr";
import { storeLocal } from "../history/storeData";

export default function Button({ data2: info }) {
	const currentDate = new Date();
	const [videoLink, setVideoLink] = useState(null);

	async function video(id) {
		const link = await fetch_video_link(id);
		if (link === undefined) {
			alert("Sorry, but not links were found");
		} else {
			setVideoLink(link);
		}
	}

	function store_to_local(name, image, episode, id) {
		let newData = {
			name: name,
			image: image,
			episode: episode,
			id: id,
			type: "anime",
			date: `${currentDate.getDate()}-${String(
				currentDate.getMonth() + 1
			).padStart(2, "0")}`,
			time: `${currentDate.getHours()}:${String(
				currentDate.getMinutes()
			).padStart(2, "0")}`,
		};
		storeLocal(newData);
	}

	return (
		<main>
			<h2 className={styles.buttonHeader}>Episodes: </h2>
			<div className={styles.buttonContainer}>
				{info &&
					info.episodes &&
					info.episodes.map((item, index) => (
						<button
							className={styles.dramaButton}
							key={index}
							onClick={(event) => {
								event.target.style.backgroundColor =
									"var(--soft-purple)";
								video(item.id);
								store_to_local(
									info.title,
									info.image,
									item.number,
									info.id
								);
							}}
						>
							{item.number}
						</button>
					))}
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
							// onQualityChange={(event) =>
							// 	console.log("changed qualities", event)
							// }
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
		</main>
	);
}
