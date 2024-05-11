"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "../styles/cw.module.css";
import Link from "next/link";

const ContinueWatching = () => {
	const [localItems, setLocalItems] = useState(null);

	useEffect(() => {
		const newData = get_local();
		setLocalItems(newData);
	}, []); // Empty dependency array means this effect runs only once after the initial render

	function get_local() {
		try {
			const data = localStorage.getItem("data");
			return JSON.parse(data);
		} catch (error) {
			console.log("error", error);
			return false;
		}
	}

	return (
		<main className={styles.main}>
			<p className={styles.mainText}>Continue Watching</p>
			{localItems && (
				<div className={styles.animeContainer}>
					{localItems.watchHis &&
						localItems.watchHis.map((item, index) => (
							<Link
								href={`/${item.type}/${item.id}`}
								style={{ textDecoration: "none" }}
								key={index}
							>
								<div className={styles.animeEntry}>
									<div className={styles.titleContainer}>
										<h3>{item.name}</h3>
										<p className={styles.EpisodeCount}>
											Episode watching: {item.episode}
										</p>
										<p className={styles.date}>
											Last watched on: {item.date} at{" "}
											{item.time} hours
										</p>
									</div>
									<Image
										src={item.image}
										width={167}
										height={267}
										alt="Continue anime poster"
										priority
									/>
								</div>
							</Link>
						))}
				</div>
			)}
		</main>
	);
};

export default ContinueWatching;
