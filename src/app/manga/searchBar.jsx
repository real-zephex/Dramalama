"use client";

import { FaSearch } from "react-icons/fa";
import styles from "./manga.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SearchBar() {
	const router = useRouter();

	const [title, setMangaTitle] = useState("");

	return (
		<main className={styles.searchMain}>
			<div className={styles.SearchBar}>
				<FaSearch color="white" style={{ marginLeft: 5 }} size={18} />
				<input
					type="text"
					name="manga"
					placeholder="Enter manga title and press enter"
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
			<div className={styles.histButton}>
				<Link href={"/manga/history/continueWatching/"}>
					<button>History</button>
				</Link>
			</div>
		</main>
	);
}
