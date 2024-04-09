import Link from "next/link";
import styles from "../../page.module.css";

export default function Header() {
	return (
		<main className={styles.main}>
			<div className={styles.header}>
				<div className={styles.left}>
					<Link
						href={"/"}
						style={{ textDecoration: "none", color: "white" }}
					>
						<p>Dramalama</p>
					</Link>
				</div>
				<div className={styles.right}>
					<Link href="/anime">Anime</Link>
					<Link href="/kdrama" style={{ pointerEvents: "none" }}>
						Kdrama
					</Link>
					<Link href="/manga">Manga</Link>
				</div>
			</div>
		</main>
	);
}
