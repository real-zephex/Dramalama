"use client";

import styles from "./read.module.css";

export default function DownloadManga({ chapterId: id }) {
	return (
		<div className={styles.DownloadMain}>
			<a
				href={`https://manga-downloader-7nca.onrender.com/download?id=${id}`}
				style={{ textDecoration: "none" }}
				onClick={() =>
					alert(
						"Downloads are not instant. It might take some time to prepare your file. Thank you for your patience"
					)
				}
			>
				<button title="should work just fine">Download - Beta</button>
			</a>
		</div>
	);
}
