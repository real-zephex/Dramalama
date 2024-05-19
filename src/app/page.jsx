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
						</div>
					</Link>
					<Link
						href={"/manga"}
						title="Click here to get redirected to the manga webpage"
					>
						<div className={styles.manga}>
							<h2>Manga</h2>
						</div>
					</Link>
					<Link
						href={"/kdrama"}
						title="Click here to get redirected to the kdrama webpage"
					>
						<div className={styles.kdrama}>
							<h2>Kdrama</h2>
						</div>
					</Link>
					<Link
						href={"/movies"}
						title="Click here to get redirected to the movie webpage"
					>
						<div className={styles.movies}>
							<h2>Movies</h2>
						</div>
					</Link>
					<Link
						href={"/web-series"}
						title="Click here to get redirected to the series webpage"
					>
						<div className={styles.series}>
							<h2>Series</h2>
						</div>
					</Link>
				</div>
			</div>
		</main>
	);
}

// Test push
