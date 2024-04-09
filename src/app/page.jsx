import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
	return (
		<main className={styles.main}>
			<div className={styles.content}>
				<div className={styles.contentContainer}>
					<div className={styles.manga}>
						<Link href={"/manga"}>
							<h2>Manga</h2>
							<p>Your one stop for all your manga needs</p>
						</Link>
					</div>
					<div className={styles.anime}>
						<Link href={"/anime"}>
							<h2>Anime</h2>
							<p>Your one stop for all your anime needs</p>
						</Link>
					</div>
					<div className={styles.kdrama}>
						<Link
							href={"/kdrama"}
							style={{ pointerEvents: "none" }}
						>
							<h2>Kdrama - Maintainence</h2>
							<p>Your one stop for all your kdrama needs</p>
						</Link>
					</div>
				</div>
			</div>
		</main>
	);
}
