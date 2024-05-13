import styles from "./styles/loading.module.css";

const Loading = async () => {
	return (
		<main className={styles.LoadingContainer}>
			<strong>Loading...</strong>
		</main>
	);
};

export default Loading;
