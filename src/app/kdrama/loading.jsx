import styles from "./styles/loading.module.css";

export default async function Loading() {
	return (
		<div className={styles.Main}>
			<div className={styles.LoadingContainer}></div>
		</div>
	);
}
