import styles from "./read.module.css";
// import Link from "next/link";

export default function DownloadManga({ chapterId: id }) {
	return (
		<div className={styles.DownloadMain}>
			<a
				href={`https://manga-downloader-7nca.onrender.com/download?id=${id}`}
				style={{ textDecoration: "none" }}
			>
				<button title="This functionality currently exhibits stability with lower-quality PDFs; however, users may encounter challenges when attempting to download higher-quality PDFs.">
					Download - Beta
				</button>
			</a>
		</div>
	);
}
