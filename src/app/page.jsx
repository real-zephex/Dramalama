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
					Welcome to dramalama. An online service where you can watch
					kdramas and anime for free.
				</p>
			</div>
			<Footer />
		</main>
	);
}
