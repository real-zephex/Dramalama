import Link from "next/link";

import styles from "./header.module.css";

export default function Header() {
	return (
		<div className={styles.headMain}>
			<div className={styles.headNav}>
				<Link
					href="/"
					style={{ color: "black", textDecoration: "none" }}
				>
					<p style={{ fontSize: "26px", color: "var(--pastel-red)" }}>
						Dramalama
					</p>
				</Link>
				<div className={styles.rightNav}>
					<Link href="/anime">
						<p>Anime</p>
					</Link>
					<Link href="/manga">
						<p>Manga</p>
					</Link>
					<Link href="/kdrama">
						<p>Kdrama</p>
					</Link>
				</div>
			</div>
			<hr style={{ marginTop: "-3px" }} />
		</div>
	);
}
