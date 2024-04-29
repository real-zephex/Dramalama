import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
	return (
		<main className={styles.newbg}>
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
						<Link href={"/kdrama"}>
							<h2>Kdrama</h2>
							<p>Your one stop for all your kdrama needs</p>
						</Link>
					</div>
					<div className={styles.netlify}>
						<Link
							href={"https://dramalama.netlify.app"}
							target="_blank"
							title="Use this if you are experiencing any issues with image loading and stuff like that. Vercel has some known limitations for image loading and other stuff and I seem to run out of them before a month ends so the images end up not loading. Sorry for the inconvience."
						>
							<h2>Netlify Instance</h2>
							<p>comparitively slow but better</p>
						</Link>
					</div>
				</div>
			</div>
		</main>
	);
}

// Test push
