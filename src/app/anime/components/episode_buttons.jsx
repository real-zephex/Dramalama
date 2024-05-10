"use client";
import { useState, useEffect } from "react";
import { MediaPlayer, MediaProvider } from "@vidstack/react";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import {
	defaultLayoutIcons,
	DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";

import styles from "../styles/buttons.module.css";
import { video_url } from "../data-fetch/request";

const EpisodesButtons = ({ data: data }) => {
	const [videoLink, setVideoLink] = useState(null);
	const [buttonGroups, setButtonGroups] = useState(null);
	const [videoLoading, setVideoLoading] = useState(null);

	useEffect(() => {
		setButtonGroups(createButtonGroups(0, 50));
	}, []);

	const groups = createGroups(data.episodes, 50);

	async function getVideoURL(epID) {
		setVideoLoading(true);
		const data = await video_url(epID);
		setVideoLink(data.sources[data.sources.length - 2].url);
		setVideoLoading(false);
	}

	function createButtonGroups(start, end) {
		return (
			<div className={styles.animeButtonContainer}>
				{data.episodes &&
					data.episodes.slice(start, end).map((item, index) => (
						<button
							className={styles.dramaButton}
							key={index}
							onClick={(event) => {
								event.target.style.backgroundColor =
									"var(--soft-purple)";
								getVideoURL(item.id);
								// store_to_local(
								// 	info.title,
								// 	info.image,
								// 	item.number,
								// 	info.id
								// );
							}}
						>
							{item.number}
						</button>
					))}
			</div>
		);
	}

	function handleSelectChange(event) {
		const selectedIndex = event.target.selectedIndex;
		const selectedGroup = groups[selectedIndex];
		if (selectedGroup) {
			setButtonGroups(
				createButtonGroups(
					selectedGroup[0].number - 1,
					selectedGroup[selectedGroup.length - 1].number
				)
			);
		}
	}

	return (
		<main className={styles.Main}>
			{data.episodes && (
				<select
					onChange={(event) => handleSelectChange(event)}
					className={styles.SelectClass}
				>
					{groups &&
						groups.map((item, index) => (
							<option key={index}>
								{item[0].number} -{" "}
								{item[item.length - 1].number}
							</option>
						))}
				</select>
			)}
			{buttonGroups}
			{videoLoading && (
				<p style={{ margin: "0.5rem 0 0 0" }}>Loading...</p>
			)}
			{videoLink && (
				<div className={styles.videoPopUp} id="popup">
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
		</main>
	);
};

function createGroups(array, size) {
	const groups = [];
	for (let i = 0; i < array.length; i += size) {
		groups.push(array.slice(i, i + size));
	}
	return groups;
}

export default EpisodesButtons;
