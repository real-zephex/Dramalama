"use client";

import styles from "../styles/search.module.css";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import FetchSearchTitle from "./searchQuery";
import Image from "next/image";
import Link from "next/link";
import { PreFetchAnimeInfo } from "./cacher";

export default function DramaSearch() {
	const [title, setTitle] = useState("");
	const [infoTitle, setInfoTitle] = useState(null);
	const [loadingText, setLoadingText] = useState(null);

	const handleSearch = async (title) => {
		setLoadingText(true);
		const data = await FetchSearchTitle(title);
		PreFetchAnimeInfo(data);
		setLoadingText(false);
		setInfoTitle(data);
	};

	return (
		<div className={styles.SearchContainer}>
			<div className={styles.Search}>
				<FaSearch color="white" size={16} />
				<input
					placeholder="Search for drama"
					onChange={(event) => setTitle(event.target.value)}
					onKeyDown={async (e) => {
						if ((e.key === "Enter" || e.code === 13) && title) {
							await handleSearch(e.target.value);
						}
					}}
				></input>
			</div>

			{loadingText && (
				<p className={styles.LoadingText}>Wait a moment...</p>
			)}

			<div className={styles.SearchResults}>
				{infoTitle &&
					infoTitle.results.map((item, index) => (
						<Link
							href={`/kdrama/${encodeURIComponent(item.id)}`}
							style={{ textDecoration: "none" }}
							key={index}
						>
							<div className={styles.SearchEntry}>
								<p>{item.title}</p>
								<Image
									src={`https://sup-proxy.zephex0-f6c.workers.dev/api-content?url=${item.image}`}
									width={140}
									height={210}
									alt="Drama Poster"
								/>
							</div>
						</Link>
					))}
			</div>
		</div>
	);
}
