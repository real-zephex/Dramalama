import styles from "./manga.module.css";
import Image from "next/image";

export default async function Manga() {
	return (
		<div className={styles.Main}>
			<div className={styles.Hero}>
				<div className={styles.WelcomeContainer}>
					<div className={styles.WelcomeText}>
						Manga madness is here
					</div>
					<button>Let's Start</button>
				</div>
				<div className={styles.ImageContainer}>
					<div className={styles.HorizontalImageContainer}>
						<Image
							src="/image.png"
							width={480}
							height={260}
							alt="Haikyu"
						/>
					</div>
					<div className={styles.VerticalImageContainer}>
						<Image
							src="/haikyu1.jpg"
							width={240}
							height={360}
							alt="Haikyu"
						/>
						<Image
							src="/solo_levelling.png"
							width={240}
							height={360}
							alt="Haikyu"
						/>
					</div>
				</div>
			</div>

			<div className={styles.SelfPromoContainer}>
				<div className={styles.Welcome1}>
					<h2 style={{ textAlign: "center" }}>
						Welcome to Dramalama Manga
					</h2>
					<p>
						Dive into a world where action jumps off the page and
						pictures paint a thousand words. Manga Universe is a
						site that will immerse you in stunning illustrations and
						compel you to lose yourself in thrilling narratives.
					</p>
				</div>
				<div className={styles.ChooseusContainer}>
					<h2 style={{ textAlign: "center" }}>Why choose us?</h2>
					<p>
						Our platform is built by manga enthusiasts, for manga
						enthusiasts. That means high quality scans, an extensive
						series catalogue, and regular series updates.
					</p>
				</div>
			</div>
		</div>
	);
}
