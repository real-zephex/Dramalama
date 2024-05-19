"use client";
import styles from "../styles/search.module.css";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";

import { SEARCH_TV } from "./data-fetch";
import SearchResults from "./searchResults";

const SearchBar = () => {
	const [title, setTitle] = useState("");
	const [result, setResults] = useState(null);
	const [loading, setloading] = useState(false);

	const fetch_results = async (title) => {
		setloading(true);
		setResults(await SearchResults(await SEARCH_TV(title)));
		setloading(false);
	};

	return (
		<main className={styles.Main}>
			<section className={styles.InputContainer}>
				<FaSearch
					color="white"
					className={styles.SearchIcon}
					size={17}
				/>
				<input
					placeholder="Enter series title here"
					onChange={(event) => setTitle(event.target.value)}
					onKeyDown={async (e) => {
						if ((e.key === "Enter" || e.code === 13) && title) {
							await fetch_results(e.target.value);
						}
					}}
				></input>
			</section>

			{loading && (
				<p style={{ color: "white", textAlign: "center" }}>
					Please wait while we crunch up all the data
				</p>
			)}
			<section className={styles.SearchResults}>{result}</section>
		</main>
	);
};

export default SearchBar;
