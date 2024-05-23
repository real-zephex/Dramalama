import { Lexend_Deca } from "next/font/google";
import Link from "next/link";
import Image from "next/image";

import styles from "../styles/search.module.css";
import { search_results } from "../data-fetch/request";
import { preFetchAnimeInfo } from "./cacher";

const lexend = Lexend_Deca({ subsets: ["latin"], weight: "400" });

const SearchResults = async (title) => {
	const data = await search_results(title);

	preFetchAnimeInfo(data);

	return (
		<section className={styles.SearchResultsContainer}>
			{data &&
				data.results.map((item, index) => (
					<Link
						shallow
						href={`/anime/${item.id}`}
						key={index}
						className={lexend.className}
						style={{ color: "white", textDecoration: "none" }}
					>
						<div className={styles.AnimeEntry}>
							<Image
								src={item.image}
								width={180}
								height={300}
								alt="Anime Poster"
							/>
							<p>{item.title}</p>
						</div>
					</Link>
				))}
		</section>
	);
};

export default SearchResults;
