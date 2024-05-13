"use client";

import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import Link from "next/link";

import styles from "../styles/search.module.css";
import SearchResults from "./search_results";

const SearcBar = () => {
	const [title, setTitle] = useState("");
	const [searchResults, setSearchResults] = useState(null);
	const [loading, setLoading] = useState(false);

	const handleSearchInput = async (title) => {
		setSearchResults(null);
		setLoading(true);
		setSearchResults(await SearchResults(title));
		setLoading(false);
	};

	return (
		<main>
			<section className={styles.SearchBarContainer}>
				<div className={styles.SearchInputContainer}>
					<FaSearch color="white" />
					<input
						placeholder="Enter anime title"
						name="Anime Title"
						type="text"
						onChange={(event) => {
							if (event.target.value.trim() != "") {
								setTitle(event.target.value);
							}
						}}
						autoComplete="off"
						onKeyDown={async (event) => {
							if (
								event.code === "Enter" ||
								event.key === "Enter" ||
								event.code === 13
							) {
								await handleSearchInput(title);
							}
						}}
					></input>
				</div>
				<Link shallow href={"/anime/continueWatching"}>
					<button className={styles.animeHistoryButton}>
						History
					</button>
				</Link>
			</section>
			{loading && (
				<p className={styles.SearchLoading}>
					Please wait while we crunch up all the data.....
				</p>
			)}
			{searchResults}
		</main>
	);
};

export default SearcBar;
