import POPULAR_MOVIES from "./components/popular";
import TREDNING_MOVIES from "./components/trending";
import SEARCH_COMPONENT from "./components/search";
import styles from "./styles/page.module.css";

export default async function MOVIE_HOME() {
	return (
		<main className={styles.MovieMain}>
			<SEARCH_COMPONENT />
			<POPULAR_MOVIES />
			<br />
			<TREDNING_MOVIES />
			<br />
			<br />
			<br />
		</main>
	);
}
