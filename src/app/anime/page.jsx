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
			<hr style={{ marginTop: 15, borderColor: "gray" }} />
			<RecentAnimes />
			<hr style={{ marginTop: 15, borderColor: "gray" }} />
			<PopularAnimes />
		</main>
	);
};

export default AnimeHomepage;
