import styles from "./manga.module.css";
import Image from "next/image";
import SearchBar from "./searchBar";

export default async function Manga() {
	return (
		<div className={styles.Main}>
			<div className={styles.Hero}>
				<div className={styles.WelcomeContainer}>
					<div className={styles.WelcomeText}>
						Manga madness is here
					</div>
					<SearchBar />
				</div>
				<div className={styles.ImageContainer}>
					<div className={styles.HorizontalImageContainer}>
						<Image
							src="/image.png"
							width={487}
							height={260}
							alt="Haikyu"
						/>
					</div>
					<div className={styles.VerticalImageContainer}>
						<Image
							src="/image.webp"
							width={240}
							height={360}
							alt="Haikyu"
						/>
						<Image
							src="/solo_poster.png"
							width={240}
							height={360}
							alt="Haikyu"
						/>
					</div>
				</div>
			</div>

			<div className={styles.SelfPromoContainer}>
				<p
					style={{
						textAlign: "center",
						fontSize: 32,
						color: "var(--soft-purple)",
						fontFamily: "Poppins",
					}}
				>
					Welcome to Dramalama Manga
				</p>
				<p style={{ marginTop: -10 }}>
					Dive into a world where action jumps off the page and
					pictures paint a thousand words. Dramalama Manga is a site
					that will immerse you in stunning illustrations and compel
					you to lose yourself in thrilling narratives.
				</p>
			</div>
		</div>
	);
}
