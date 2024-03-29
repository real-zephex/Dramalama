import styles from "./loading.module.css";

export default function Loading() {
	return (
		<div className={styles.loadingContainer}>
			<p className={styles.loadingText}>
				Please wait while we load all the data for you.
			</p>
		</div>
	);
}
