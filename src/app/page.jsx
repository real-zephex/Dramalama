import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
	return (
		<main className={styles.newbg}>
			<div className={styles.content}>
				<p style={{ color: "white" }}>
					Sorry for the inconvenience but we have suspended all our
					operations on vercel. Please visit{" "}
					<Link
						href={"https://dramalama.netlify.app"}
						target="_parent"
					>
						Dramalama on Netlify
					</Link>
					.
				</p>
				<p>
					Also checkout our{" "}
					<Link
						href={"https://github.com/real-zephex/Dramalama"}
						target="_blank"
					>
						github
					</Link>{" "}
					repository.
				</p>
				<strong>Thank you for all your support 💜</strong>
				{/* <div className={styles.contentContainer}>
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
				</div> */}
			</div>
		</main>
	);
}

// Test push
