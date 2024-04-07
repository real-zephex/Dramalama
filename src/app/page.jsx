import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import Footer from "./components/footer/page";

export default function Home() {
	return (
		<main className={styles.main}>
			<Link href="https://github.com/real-zephex/Dramalama">
				<Image
					src={"/dramalama.svg"}
					width={480}
					height={240}
					className={styles.HomeSVG}
				/>
			</Link>
			<div className={styles.redirects}>
				<Link href="/kdrama">
					<p>kdrama </p>
				</Link>
				<p style={{ color: "white" }}>|</p>
				<Link href="/">
					<p>
						anime
						<span style={{ color: "var(--pastel-red)" }}>
							(depr)
						</span>
					</p>
				</Link>
				<p style={{ color: "white" }}>|</p>
				<Link href="/">
					<p>
						manga
						<span style={{ color: "var(--pastel-red)" }}>
							(down)
						</span>
					</p>
				</Link>
			</div>
		</main>
	);
}
