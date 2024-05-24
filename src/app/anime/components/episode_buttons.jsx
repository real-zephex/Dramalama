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
import { preFetchVideoLinks } from "./cacher";
import { storeLocal } from "./storeHistory";

const EpisodesButtons = ({ data: data }) => {
	const [videoLink, setVideoLink] = useState(null);
	const [buttonGroups, setButtonGroups] = useState(null);
	const [videoLoading, setVideoLoading] = useState(null);

	useEffect(() => {
		setButtonGroups(createButtonGroups(0, 50));
	}, []);

	const groups = createGroups(data.episodes, 50);

	/**
	 * Retrieves the video URL for a given episode ID.
	 * This function handles the initializing, changing URL, and hiding the video player.
	 * @param {string} epID - The episode ID.
	 */
	async function getVideoURL(epID) {
		setVideoLoading(true);
		const data = await video_url(epID);
		setVideoLink(data.sources[data.sources.length - 2].url);
		setVideoLoading(false);
	}

	/**
	 * Creates button groups for a range of episodes.
	 * @param {number} start - The starting index of episodes.
	 * @param {number} end - The ending index of episodes.
	 * @returns {JSX.Element} - Button groups JSX element.
	 */
	function createButtonGroups(start, end) {
		try {
			const buttons = document.getElementsByClassName("episode-button");
			for (let i = 0; i < buttons.length; i++) {
				buttons[i].style.backgroundColor = "#1f1f1fd2";
			}
		} catch (error) {
			console.error(
				"ERROR: This error is expected. This is done in order to reset the background color of the buttons. I can't think of a better way than this....so yeah.",
				error.message
			);
		}

		return (
			<div className={styles.animeButtonContainer}>
				{data.episodes &&
					data.episodes.slice(start, end).map((item, index) => (
						<button
							className={styles.dramaButton + " episode-button"}
							key={index}
							onClick={(event) => {
								event.target.style.backgroundColor =
									"var(--soft-purple)";
								getVideoURL(item.id);
								store_to_local(
									data.title,
									data.image,
									item.number,
									data.id
								);
							}}
						>
							{item.number}
						</button>
					))}
			</div>
		);
	}

	/**
	 * Handles the change event of the select element.
	 * @param {Event} event - The change event object.
	 */
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
			preFetchVideoLinks(
				data.episodes.slice(
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

/**
 * Divides an array into groups of a specified size.
 * @param {Array} array - The array to be divided.
 * @param {number} size - The size of each group.
 * @returns {Array} - An array containing groups of elements.
 */
function createGroups(array, size) {
	const groups = [];
	for (let i = 0; i < array.length; i += size) {
		groups.push(array.slice(i, i + size));
	}
	return groups;
}

/**
 * Stores watch history to local storage.
 * @param {string} name - The name of the episode.
 * @param {string} image - The image URL of the episode.
 * @param {number} episode - The episode number.
 * @param {string} id - The ID of the episode.
 */
function store_to_local(name, image, episode, id) {
	const currentDate = new Date();

	try {
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
	} catch (error) {
		console.error(
			"Some error occurred during the process of saving your watch history to local storage. Please try again or contact us on GitHub if this issue persists.",
			error.message
		);
	}
}

export default EpisodesButtons;
