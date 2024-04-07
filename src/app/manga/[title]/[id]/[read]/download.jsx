import styles from "./read.module.css";
// import Link from "next/link";

export default function DownloadManga({ chapterId: id }) {
	return (
		<div className={styles.DownloadMain}>
			<a
				href={`https://manga-downloader-7nca.onrender.com/download?id=${id}`}
				style={{ textDecoration: "none" }}
			>
				<button disabled title="Not available right now.">
					Download - Beta
				</button>
			</a>
		</div>
	);
}
