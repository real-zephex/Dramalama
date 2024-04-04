import styles from "./styles/kdrama.module.css";
import PopularDramas from "./components/popular";
import RecentDramas from "./components/recent";

export default async function Kdrama() {
	return (
		<div className={styles.Main}>
			<PopularDramas />
			<RecentDramas />
		</div>
	);
}
