import styles from "./page.module.css";
import Link from "next/link";

export default async function Home() {
	return (
		<main className={styles.newbg}>
			<div className={styles.content}>
				<div className={styles.contentContainer}>
					<Link
						href={"/anime"}
						title="Click here to get redirected to the anime webpage"
					>
						<div className={styles.anime}>
							<h2>Anime</h2>
							<p>Your one stop for all your anime needs</p>
						</div>
					</Link>
					<Link
						href={"/manga"}
						title="Click here to get redirected to the manga webpage"
					>
						<div className={styles.manga}>
							<h2>Manga</h2>
							<p>Your one stop for all your manga needs</p>
						</div>
					</Link>
					<Link
						href={"/kdrama"}
						title="Click here to get redirected to the kdrama webpage"
					>
						<div className={styles.kdrama}>
							<h2>Kdrama</h2>
							<p>Your one stop for all your kdrama needs</p>
						</div>
					</Link>
					<Link
						href={"/movies"}
						title="Click here to get redirected to the kdrama webpage"
					>
						<div className={styles.movies}>
							<h2>Movies</h2>
							<p>Your one stop for all your movie needs</p>
						</div>
					</Link>
					<Link
						href={"/web-series"}
						title="Click here to get redirected to the kdrama webpage"
					>
						<div className={styles.movies}>
							<h2>Web Series</h2>
							<p>Your one stop for all your web-series needs</p>
						</div>
					</Link>
				</div>
			</div>
		</main>
	);
}

// Test push
