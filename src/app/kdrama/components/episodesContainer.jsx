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
import { videoLink } from "./requests";

const EpisodesContainer = ({ data: data }) => {
	const [videolink, setVideoLink] = useState("");
	const [loading, setLoading] = useState(<></>);

	async function handleSelectChange(episodeId) {
		setVideoLink("");
		setLoading(
			<div className="w-full flex items-center gap-3">
				<div className="w-full flex flex-col gap-2">
					<Skeleton className="h-44 rounded-lg lg:h-96" />
				</div>
			</div>
		);
		const videoURL = await videoLink(episodeId, data.id);
		setLoading(<></>);
		setVideoLink(videoURL);
	}

	return (
		<section>
			<div className="flex w-full flex-wrap md:flex-nowrap gap-4 my-2">
				<Select
					label="Select Episode"
					className={`${lexend.className} max-w-xs`}
				>
					{data.episodes && data.episodes.length > 0 ? (
						data.episodes.map((item, index) => (
							<SelectItem
								key={index}
								textValue={item.episode}
								onClick={async () =>
									await handleSelectChange(item.id)
								}
								className={lexend.className}
							>
								{item.episode}
							</SelectItem>
						))
					) : (
						<SelectItem disabled className={lexend.className}>
							No episodes available right now
						</SelectItem>
					)}
				</Select>
			</div>

			{loading}
			{videolink && (
				<div>
					<MediaPlayer
						title={data.title}
						src={videolink}
						aspectRatio="16/9"
						load="eager"
						playsInline
						volume={0.8}
						autoPlay
					>
						<MediaProvider />
						<DefaultVideoLayout icons={defaultLayoutIcons} />
					</MediaPlayer>
				</div>
			)}
		</section>
	);
};

export default EpisodesContainer;
