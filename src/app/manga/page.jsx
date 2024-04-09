import styles from "./manga.module.css";
import Image from "next/image";
import SearchBar from "./searchBar";

export default async function Manga() {
	return (
		<div className={styles.Main}>
			<Image
				src="/manga.svg"
				width={480}
				height={200}
				className={styles.MangaSVG}
				alt="Manga SVG"
			/>
			<SearchBar />
		</div>
	);
}
