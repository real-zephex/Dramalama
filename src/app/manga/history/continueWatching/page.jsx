"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./cw.module.css";
import Link from "next/link";

const ContinueWatching = () => {
	const [localItems, setLocalItems] = useState(null);

	useEffect(() => {
		const newData = get_local();
		setLocalItems(newData);
	}, []); // Empty dependency array means this effect runs only once after the initial render

	function get_local() {
		try {
			const data = localStorage.getItem("mangaData");
			return JSON.parse(data);
		} catch (error) {
			console.log("error", error);
			return false;
		}
	}

	return (
		<main className={styles.main}>
			<p className={styles.mainText}>Continue Reading</p>
			{localItems && (
				<div className={styles.animeContainer}>
					{localItems.watchHis &&
						localItems.watchHis.map((item, index) => (
							<div key={index} className={styles.animeEntry}>
								<div className={styles.titleContainer}>
									<h3>{item.title}</h3>
									<p className={styles.EpisodeCount}>
										Currently reading: Volume {item.volume}{" "}
										Chapter {item.chapter}
									</p>
									<div className={styles.redirects}>
										<Link
											href={`/manga/info/${item.mangaId}`}
										>
											<button>Info Page</button>
										</Link>
										<Link
											href={`/manga/info/read/${item.id}`}
										>
											<button>
												Read current chapter
											</button>
										</Link>
									</div>
								</div>
								<Image
									src={item.image}
									width={140}
									height={210}
									alt="Continue anime poster"
									priority
								/>
							</div>
						))}
				</div>
			)}
		</main>
	);
};

export default ContinueWatching;
