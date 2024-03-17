"use client";

import "./kdrama.css";

import { useState } from "react";
import ReactPlayer from "react-player";
import Image from "next/image";
import { FaSearch } from "react-icons/fa"; // Import the search icon from react-icons library

import {
	fetchAnimeInfo,
	fetchDramaInfo,
	fetchVideoLinks,
} from "./api/fetchAnime.js";

export default function Kdrama() {
	const [searchTitle, setSearchTitle] = useState("");
	const [searchedDrama, setSearchedDrama] = useState(null);
	async function handleKeyPresses(event) {
		if (
			(event.code === "Enter" ||
				event.code === 13 ||
				event.key === "Enter") &&
			searchTitle != ""
		) {
			const info = await fetchAnimeInfo(searchTitle);
			setSearchedDrama(info);
			document.getElementById("popup").style.display = "flex";
		}
	}

	const [details, setDetails] = useState(null);
	async function handleDramaSearch(input) {
		const drama_info = await fetchDramaInfo(input);
		setDetails(drama_info);
		document.getElementById("intro").style.display = "none";
		document.getElementById("videoContainer").style.display = "flex";
	}

	const [videoLink, setVideoLink] = useState(null);
	const [episodeNo, setEpisodeNo] = useState("");
	async function get_video_link(ep_id, drama_id, episode) {
		const link = await fetchVideoLinks(drama_id, ep_id);
		const video_link = link.sources[0].url;
		setVideoLink(video_link);
		setEpisodeNo(episode);
	}

	return (
		<main className="main">
			<div className="sC">
				<FaSearch className="searchIcon" />
				<input
					placeholder="Enter drama title"
					onChange={(event) => setSearchTitle(event.target.value)}
					onKeyDown={(event) => handleKeyPresses(event)}
				/>
			</div>

			<div className="intro" id="intro">
				<p className="introText">Start by searching for some dramas</p>
				<p className="introText2">Look for the search box above.</p>
			</div>

			<div className="videoContainer" id="videoContainer">
				<div className="dramaInfoContainer">
					{videoLink && (
						<div className="videoPlayer">
							<ReactPlayer
								url={videoLink}
								controls
								playsinline
								width={"100%"}
								height={"auto"}
								id="thing"
							/>
						</div>
					)}
					{episodeNo && (
						<p
							style={{
								color: "white",
								fontFamily: "Atkinson Hyperlegible",
								color: "#FF6868",
								textAlign: "center",
							}}
						>
							Episode {episodeNo}
						</p>
					)}

					{details && (
						<div className="dramaInfo">
							<div className="titleContainer">
								<p className="dramaTitle">{details.title}</p>
								<Image
									className="dramaImage"
									src={details.image}
									width={"160"}
									height={"240"}
									alt="Drama"
								/>
							</div>
							<p className="dramaDescription">
								{details.description}
							</p>
							<div className="episodesButtonsContainer">
								{details.episodes.map((eps, index) => (
									<button
										key={index}
										className="episodeButton"
										onClick={() =>
											get_video_link(
												eps.id,
												details.id,
												eps.episode
											)
										}
									>
										{eps.episode}
									</button>
								))}
							</div>
						</div>
					)}
				</div>
			</div>

			<div className="popup" id="popup">
				<div className="popupEntries">
					{searchedDrama &&
						searchedDrama.results.map((item, index) => (
							<div
								className="popupEntry"
								key={index}
								onClick={() => handleDramaSearch(item.id)}
							>
								<p>{item.title}</p>
								<Image
									src={item.image}
									alt={item.title}
									width={"200"}
									height={"180"}
								/>
							</div>
						))}
				</div>

				<div
					className="closeButton"
					onClick={() =>
						(document.getElementById("popup").style.display =
							"none")
					}
				>
					<button>Close</button>
				</div>
			</div>
		</main>
	);
}
