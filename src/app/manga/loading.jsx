import styles from "./manga.module.css";

export default function Loading() {
	return (
		<div className={styles.LoadingContainer}>
			<p>Please wait while we are loading your content....</p>
		</div>
	);
}
