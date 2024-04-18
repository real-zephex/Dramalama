"use client";

import styles from "./read.module.css";
import { useEffect } from "react";

function get_current_info(title) {
	let req = {};

	useEffect(() => {
		const data = JSON.parse(localStorage.getItem("mangaData"));
		data.watchHis.forEach((element) => {
			if (element.title === title) {
				req.chapter = element.chapter;
				req.volume = element.volume;
			}
		});
	}, []);

	return req || false;
}

export default function Current({ name: title }) {
	let data = get_current_info(title);
	if (!data) {
		return;
	}

	return (
		<section className={styles.CurrentMain}>
			<p className={styles.CurrentChapter}>{data.chapter}</p>
			<p className={styles.CurrentVolume}>{data.volume}</p>
		</section>
	);
}
