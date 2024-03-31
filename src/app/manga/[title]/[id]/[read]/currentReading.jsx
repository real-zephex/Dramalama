"use client";
import { useState, useEffect } from "react";
import styles from "./read.module.css";

export default function CurrentReading() {
	const [chapter, setChapter] = useState(null);
	const [volume, setVolume] = useState(null);

	useEffect(() => {
		setChapter(localStorage.getItem("chapter") || "");
		setVolume(localStorage.getItem("volume") || "");
	});

	return CR(chapter, volume);
}

function CR(chapter, volume) {
	return (
		<div className={styles.CurrentReadingContainer}>
			{chapter && volume && (
				<p>
					Reading: Vol {volume} Chapter {chapter}
				</p>
			)}
		</div>
	);
}
