import styles from "./loading.module.css";

export default function Loading() {
	return (
		<div className={styles.Main}>
			<div className={styles.LoadingContainer}></div>
		</div>
	);
}
