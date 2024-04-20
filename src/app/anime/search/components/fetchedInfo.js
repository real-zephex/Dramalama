import styles from "../search.module.css";
import Link from "next/link";
import Image from "next/image";
import { preFetchAnimeInfo } from "../../videoLinkfetcher";

export default async function fetchedInfo(data) {
	preFetchAnimeInfo(data);
	return (
		<div className={styles.animeEntry}>
			{data ? (
				data.results && data.results.length > 0 ? (
					data.results.map((item, index) => (
						<Link
							key={index}
							href={`/anime/${item.id}`}
							style={{ textDecoration: "none" }}
						>
							<div className={styles.anime}>
								<p>{item.title}</p>
								<Image
									src={`https://sup-proxy.zephex0-f6c.workers.dev/api-content?url=${item.image}`}
									className={styles.animeImage}
									width={120}
									height={180}
									alt="Drama Poster"
								/>
							</div>
						</Link>
					))
				) : (
					<div style={{ margin: "0px auto" }}>
						<p
							style={{
								color: "white",
								fontFamily: "Kanit",
								fontSize: 18,
							}}
						>
							No results found
						</p>
					</div>
				)
			) : null}
		</div>
	);
}
