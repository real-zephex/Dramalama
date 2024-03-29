import Image from "next/image";
import styles from "./page.module.css";
import Footer from "./components/footer/page";

export default function Home() {
	return (
		<main className={styles.main}>
			<div className={styles.welcomeContainer}>
				<Image
					src="/logo.png"
					width={300}
					height={300}
					alt="Logo"
					priority
				></Image>
				<p>
					Hey there, welcome to Dramalama. We are excited to have you
					on board.
				</p>
			</div>
			<Footer />
		</main>
	);
}
