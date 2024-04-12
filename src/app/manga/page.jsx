import styles from "./manga.module.css";
import Image from "next/image";
import SearchBar from "./searchBar";

// This is the landing page for the manga section. Nothing much here but my only complaint is the loading time for the svg. It's too big but idk how to fix it. I mean I could use a png but then the quality is not good. Will keep it like this for the time being

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
