import styles from "./styles/anime.module.css";
import PopularAnimes from "./components/popularAnimes";
import RecentAnimes from "./components/recentEpisodes";
import TopAiringAnimes from "./components/topAiring";
import SearcBar from "./components/search";
const AnimeHomepage = async () => {
	return (
		<main className={styles.Main}>
			<SearcBar />
			<TopAiringAnimes />
			<br />
			<RecentAnimes />
			<br />
			<PopularAnimes />
		</main>
	);
};

export default AnimeHomepage;
