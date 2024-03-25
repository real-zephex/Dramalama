import styles from "./read.module.css";
import Link from "next/link";

export default function DownloadManga({ chapterId: id }) {
	return (
		<div className={styles.DownloadMain}>
			<Link
				href={`https://manga-downloader-7nca.onrender.com/download?id=${id}`}
				style={{ textDecoration: "none" }}
			>
				<button title="This feature is in very early stages. Use it on your own risk">
					Download - Beta
				</button>
			</Link>
		</div>
	);
}
