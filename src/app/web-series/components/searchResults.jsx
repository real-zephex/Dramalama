"use server";

import Link from "next/link";
import Image from "next/image";
import styles from "../styles/search.module.css";
import PreFecthSeriesInfo from "./cacher";

const SearchResults = async (data) => {
	PreFecthSeriesInfo(data);
	return (
		<div className={styles.SearchedSeriesContainer}>
			{data &&
				data.results.map((item, index) => (
					<Link
						key={index}
						style={{ color: "white", textDecoration: "none" }}
						href={`/web-series/${item.id}`}
						title={item.name}
					>
						<div className={styles.SearchedSeriesEntry}>
							<Image
								src={`https://sup-proxy.zephex0-f6c.workers.dev/api-content?url=https://image.tmdb.org/t/p/original${item.poster_path}`}
								width={160}
								height={247}
								alt="Searched Series Poster"
							/>
							<p>{item.name}</p>
						</div>
					</Link>
				))}
		</div>
	);
};

export default SearchResults;
