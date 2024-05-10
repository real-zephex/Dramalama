import { Atkinson_Hyperlegible } from "next/font/google";
import Link from "next/link";
import Image from "next/image";

import styles from "../styles/search.module.css";
import { search_results } from "../data-fetch/request";
import { preFetchAnimeInfo } from "./cacher";

const atkinson = Atkinson_Hyperlegible({ subsets: ["latin"], weight: "400" });

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
						className={atkinson.className}
						style={{ color: "white", textDecoration: "none" }}
					>
						<div className={styles.AnimeEntry}>
							<p>{item.title}</p>
							<Image
								src={item.image}
								width={140}
								height={200}
								alt="Anime Poster"
							/>
						</div>
					</Link>
				))}
		</section>
	);
};

export default SearchResults;
