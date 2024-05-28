"use client";

import { useEffect, useState } from "react";

import { Input } from "@nextui-org/react";

const SeriesVideoPlayer = ({ id: id }) => {
	const [seasonNumber, setSeasonNumber] = useState("");
	const [episodeNumber, setEpisodeNumber] = useState("");
	const [videoFrame, setVideoFrame] = useState(<></>);

	useEffect(() => {
		setVideoFrame(VideoFrameGenerator(1, 1));
	}, []);

	const VideoFrameGenerator = (sea, epi) => {
		return (
			<iframe
				src={`https://vidsrc.pro/embed/tv/${id}/${sea}/${epi}`}
				allowFullScreen
				referrerPolicy="origin"
				height={720}
				className="w-full h-[240px] lg:h-[720px]"
			></iframe>
		);
	};

	function renderVideoFrame() {
		if (seasonNumber === "" || episodeNumber === "") {
			alert(
				"Make sure that you have entered the episode number and the season number."
			);
			return;
		}

		setVideoFrame(VideoFrameGenerator(seasonNumber, episodeNumber));
	}

	return (
		<div>
			{videoFrame}
			<div className="flex w-full items-center md:flex-nowrap gap-2 mt-2">
				<Input
					type="number"
					label="Season"
					placeholder="Season Number"
					isRequired
					onChange={(event) => {
						setSeasonNumber(event.target.value);
					}}
					onKeyDown={(event) => {
						if (event.key === "Enter" || event.code === "Enter") {
							renderVideoFrame();
						}
					}}
				/>
				<Input
					type="number"
					label="Episode"
					placeholder="Episode Number"
					isRequired
					onChange={(event) => {
						setEpisodeNumber(event.target.value);
					}}
					onKeyDown={(event) => {
						if (event.key === "Enter" || event.code === "Enter") {
							renderVideoFrame();
						}
					}}
				/>
			</div>
		</div>
	);
};

export default SeriesVideoPlayer;
