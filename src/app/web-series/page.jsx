import styles from "./styles/web-series.module.css";
import Pages from "./components/HomePageModules";
import SearchBar from "./components/searchBar";

export default async function SeriesHomepage() {
	return (
		<main className={styles.main}>
			<SearchBar />
			<Pages type={"popular"} />
			<hr
				style={{
					borderColor: "grey",
					marginTop: 15,
					marginBottom: -15,
				}}
			/>
			<Pages type={"trending"} />
			<hr
				style={{
					borderColor: "grey",
					marginTop: 15,
					marginBottom: -15,
				}}
			/>
			<Pages type={"top"} />
		</main>
	);
}
