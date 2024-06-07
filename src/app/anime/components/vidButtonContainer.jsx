"use client";

import { MediaPlayer, MediaProvider } from "@vidstack/react";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import {
	defaultLayoutIcons,
	DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";
import { Select, SelectItem, Button, Skeleton } from "@nextui-org/react";
import { useState, useEffect } from "react";

import { lexend } from "../../../../config/fonts";
import { video_url } from "../data-fetch/request";
import store_to_local from "./saveToLocalStorage";

const EpisodesContainer = ({ data: data }) => {
	const [videoLink, setVideoLink] = useState("");
	const [buttonGroups, setButtonGroups] = useState(<></>);
	const [videoLoading, setVideoLoading] = useState(<></>);

	useEffect(() => {
		setButtonGroups(createButtonGroups(0, 50));
	}, []);

	const groups = createGroups(data.episodes, 50);

	function createButtonGroups(start, end) {
		setButtonGroups(<></>);
		return (
			<div className={`${lexend.className} text-center`}>
				{data.episodes &&
					data.episodes.slice(start, end).map((item, index) => (
						<Button
							radius="sm"
							color="default"
							key={index}
							className="mr-2 mt-2"
							size="sm"
							onClick={async (event) => {
								event.currentTarget.style.backgroundColor =
									"orange";
								await changeVideoLink(item.id);
								store_to_local(
									data.title,
									data.image,
									item.number,
									data.id
								);
							}}
						>
							{item.number}
						</Button>
					))}
			</div>
		);
	}

	function handleSelectChange(item) {
		// console.log(item[item.length - 1].number);
		const start_index = item[0].number;
		const end_index = item[item.length - 1].number;
		setButtonGroups(createButtonGroups(start_index - 1, end_index));
	}

	async function changeVideoLink(id) {
		setVideoLink("");
		setVideoLoading(
			<div className="w-full flex items-center gap-3">
				<div className="w-full flex flex-col gap-2">
					<Skeleton className="h-44 rounded-lg lg:h-96" />
				</div>
			</div>
		);
		const videoURL = await video_url(id);
		setVideoLoading(<></>);
		const video_link = videoURL.sources[videoURL.sources.length - 2].url;
		await navigator.clipboard.writeText(video_link);
		setVideoLink(video_link);
	}

	return (
		<main>
			{videoLoading}
			{videoLink && (
				<div>
					<MediaPlayer
						title={data.title}
						src={videoLink}
						aspectRatio="16/9"
						load="eager"
						playsInline
						volume={0.5}
					>
						<MediaProvider />
						<DefaultVideoLayout icons={defaultLayoutIcons} />
					</MediaPlayer>
				</div>
			)}
			{data.episodes && (
				<div className="flex w-full flex-wrap md:flex-nowrap gap-4 my-2">
					<Select
						label="Select Episode Group"
						className={`${lexend.className} max-w-xs`}
					>
						{groups &&
							groups.map((item, index) => (
								<SelectItem
									key={index}
									textValue={`${item[0].number} - ${
										item[item.length - 1].number
									}`}
									onClick={() => handleSelectChange(item)}
									className={lexend.className}
								>
									{item[0].number} -{" "}
									{item[item.length - 1].number}
								</SelectItem>
							))}
					</Select>
				</div>
			)}
			{buttonGroups}
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

export default EpisodesContainer;
