import styles from "./styles/kdrama.module.css";
import PopularDramas from "./components/popular";
import RecentDramas from "./components/recent";
import DramaSearch from "./components/search";

export default async function Kdrama() {
	return (
		<div className={styles.Main}>
			<DramaSearch />
			<PopularDramas />
			<hr style={{ marginTop: 15, borderColor: "gray" }} />
			<RecentDramas />
		</div>
	);
}
