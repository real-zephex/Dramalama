import styles from "../styles/popular.module.css";
import Image from "next/image";
import Link from "next/link";

export default async function PopularDramas() {
	const popular = await getPopular();

	return (
		<div className={styles.Main}>
			<p className={styles.popDramasText}>Popular Dramas</p>

			<div className={styles.AnimeContainer}>
				{popular &&
					popular.results.map((item, index) => (
						<Link
							href={`/kdrama/${encodeURIComponent(item.id)}`}
							key={index}
							style={{ textDecoration: "none" }}
						>
							<div className={styles.AnimeEntry}>
								<Image
									src={item.image}
									width={160}
									height={240}
									alt="Drama Poster"
								/>
								<p>{item.title}</p>
							</div>
						</Link>
					))}
			</div>
		</div>
	);
}

async function getPopular() {
	const res = await fetch("https://dramacool-scraper.vercel.app/popular", {
		next: { revalidate: 86400 },
	});
	const data = await res.json();
	return data;
}
