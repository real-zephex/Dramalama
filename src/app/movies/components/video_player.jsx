"use client";

import styles from "../styles/video_player.module.css";
import { useState, useEffect } from "react";

export default function VIDEO_PLAYER({ id: id }) {
	const [frame, setFrame] = useState(null);

	useEffect(() => {
		make_player(`https://vidsrc.icu/embed/movie/${id}`);
	}, []);

	function make_player(url) {
		setFrame(
			<iframe
				src={url}
				referrerPolicy="origin"
				allowFullScreen
				className={styles.VideoPlayer}
			></iframe>
		);
	}

	return (
		<section className={styles.VideoContainer}>
			<div>
				<button
					onClick={() =>
						make_player(`https://vidsrc.pro/embed/movie/${id}`)
					}
				>
					Vidsrc.pro
				</button>
				<button
					onClick={() =>
						make_player(`https://blackvid.space/embed?tmdb=${id}`)
					}
				>
					Blackvid
				</button>
				<button
					onClick={() =>
						make_player(`https://vidsrc.to/embed/movie/${id}`)
					}
				>
					Vidsrc.to
				</button>
				<button
					onClick={() =>
						make_player(`https://vidsrc.icu/embed/movie/${id}`)
					}
				>
					Vidsrc.icu
				</button>
				<button
					onClick={() =>
						make_player(
							`https://player.autoembed.cc/embed/movie/${id}`
						)
					}
				>
					Autoembded.cc
				</button>
			</div>
			{frame}
		</section>
	);
}
