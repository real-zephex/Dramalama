"use client";

import styles from "./info.module.css";
import { useState, useEffect } from "react";
import { fetch_video_link } from "../videoLinkfetcher";
import { MediaPlayer, MediaProvider } from "@vidstack/react";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import {
	defaultLayoutIcons,
	DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";
import { storeLocal } from "../history/storeData";

export default function Button({ data2: info }) {
	const currentDate = new Date();
	const [videoLink, setVideoLink] = useState(null);
	const [buttonGroups, setButtonGroups] = useState(null);

	useEffect(() => {
		create_button_group(0, 50);
	}, []);

	const groups = createGroups(info.episodes, 50);

	async function video(id) {
		const link = await fetch_video_link(id);
		if (link === undefined) {
			alert("Sorry, but not links were found");
		} else {
			setVideoLink(link);
		}
	}

	function createGroups(array, size) {
		const groups = [];
		for (let i = 0; i < array.length; i += size) {
			groups.push(array.slice(i, i + size));
		}
		return groups;
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

	function create_button_group(start, end) {
		setButtonGroups(
			<div className={styles.buttonContainer}>
				{info.episodes &&
					info.episodes.slice(start, end).map((item, index) => (
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
		);
	}

	function handleSelectChange(event) {
		const selectedIndex = event.target.selectedIndex;
		const selectedGroup = groups[selectedIndex];
		if (selectedGroup) {
			create_button_group(
				selectedGroup[0].number - 1,
				selectedGroup[selectedGroup.length - 1].number
			);
		}
	}

	return (
		<main>
			<h2 className={styles.buttonHeader}>Episodes: </h2>
			{info.episodes && (
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
}
