"use client";

import styles from "../styles/search.module.css";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import FetchSearchTitle from "./searchQuery";
import Image from "next/image";
import Link from "next/link";

export default function DramaSearch() {
	const [title, setTitle] = useState("");
	const [infoTitle, setInfoTitle] = useState(null);

	async function getSearchResults(title) {
		const data = await FetchSearchTitle(title);
		setInfoTitle(data);
	}

	return (
		<div className={styles.SearchContainer}>
			<div className={styles.Search}>
				<FaSearch color="white" size={16} />
				<input
					placeholder="Search for drama"
					onChange={(event) => setTitle(event.target.value)}
					onKeyDown={async (e) => {
						if ((e.key === "Enter" || e.code === 13) && title) {
							await getSearchResults(e.target.value);
						}
					}}
				></input>
			</div>

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
									src={item.image}
									width={110}
									height={180}
									alt="Drama Poster"
								/>
							</div>
						</Link>
					))}
			</div>
		</div>
	);
}
