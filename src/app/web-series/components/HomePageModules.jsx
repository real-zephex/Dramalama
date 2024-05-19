import { POPULAR_SHOWS, TRENDING_SHOWS, TOP_SHOWS } from "./data-fetch";
import styles from "../styles/pages.module.css";
import Image from "next/image";
import Link from "next/link";
import PreFecthSeriesInfo from "./cacher";

const HomepageUtils = async (type) => {
	const fetchFunctions = {
		popular: POPULAR_SHOWS,
		trending: TRENDING_SHOWS,
		top: TOP_SHOWS,
	};

	const fetchData = fetchFunctions[type];

	if (fetchData) {
		return await fetchData();
	} else {
		return;
	}
};

const Pages = async ({ type: type }) => {
	const data = await HomepageUtils(type);
	PreFecthSeriesInfo(data);
	return (
		<main className={styles.main}>
			<h2>{type} series</h2>
			<section className={styles.SeriesContainer}>
				{data &&
					data.results.length > 0 &&
					data.results.map((item, index) => (
						<Link
							key={index}
							href={`/web-series/${item.id}`}
							style={{ textDecoration: "none", color: "white" }}
							title={item.name}
						>
							<section className={styles.SeriesEntry}>
								<Image
									src={`https://sup-proxy.zephex0-f6c.workers.dev/api-content?url=https://image.tmdb.org/t/p/original${item.poster_path}`}
									width={167}
									height={267}
									alt="Series Poster"
									priority
								/>
								<p>{item.name || "Not sure"}</p>
							</section>
						</Link>
					))}
			</section>
		</main>
	);
};

export default Pages;
