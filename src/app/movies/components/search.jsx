"use client";

import { useState } from "react";
import styles from "../styles/search.module.css";
import { FaSearch } from "react-icons/fa";
import SearchResults from "./search_2";

export default function SEARCH_COMPONENT() {
	const [title, setTitle] = useState("");
	const [result, setResults] = useState(null);

	const fetch_results = async (title) => {
		setResults(await SearchResults(title));
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
					placeholder="Enter movie title here"
					onChange={(event) => setTitle(event.target.value)}
					onKeyDown={async (e) => {
						if ((e.key === "Enter" || e.code === 13) && title) {
							await fetch_results(e.target.value);
						}
					}}
				></input>
			</section>

			<section className={styles.SearchResults}>{result}</section>
		</main>
	);
}
