"use client";

import { FaSearch } from "react-icons/fa";
import styles from "./manga.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
	const router = useRouter();

	const [title, setMangaTitle] = useState("");

	return (
		<div className={styles.SearchBar}>
			<FaSearch color="white" style={{ marginLeft: 5 }} />
			<input
				type="text"
				name="manga"
				placeholder="Enter manga title"
				autoComplete="off"
				onChange={(e) => setMangaTitle(e.target.value)}
				onKeyDown={(event) => {
					if (
						(event.key === "Enter" ||
							event.code === 13 ||
							event.code === "Enter") &&
						title !== ""
					) {
						router.push(`/manga/${title}`);
					}
				}}
			></input>
		</div>
	);
}
