import { Card, CardHeader, CardBody } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
	title: "Dramalama TV-Shows",
	description: "Web series page for Dramalama",
};

import {
	TOP_SHOWS,
	TRENDING_SHOWS,
	POPULAR_SHOWS,
} from "./components/data-fetch";
import PreFecthSeriesInfo from "./components/cacher";
import SeriesSearchBar from "./components/search";
import styles from "../page.module.css";

const SeriesHomepage = async () => {
	const top_data = await TOP_SHOWS();
	const trending_data = await TRENDING_SHOWS();
	const popular_data = await POPULAR_SHOWS();

	const dataToBeLoaded = [top_data, trending_data, popular_data];

	for (let item of dataToBeLoaded) {
		PreFecthSeriesInfo(item);
	}

	const HomepageDataFormatter = (title, data) => {
		return (
			<section className="flex flex-col">
				<p className="text-2xl font-bold text-sky-400">{title}</p>

				<div
					className={`mt-1 flex items-center overflow-auto pb-2 ${styles.ScrollBarAdjuster}`}
				>
					{data &&
						data.results.map((item, index) => (
							<Link
								key={index}
								href={`/web-series/${item.id}`}
								aria-label="anime redirection links"
								className="mx-1 flex flex-col items-center"
							>
								<Card
									className="overflow-visible bg-stone-800"
									isPressable
									isHoverable
									shadow="sm"
								>
									<CardBody>
										<Image
											alt="Movie Poster"
											src={`https://sup-proxy.zephex0-f6c.workers.dev/api-content?url=https://image.tmdb.org/t/p/original${item.poster_path}`}
											width={270}
											height={170}
											className="h-64 overflow-hidden rounded-md"
											priority
										/>
									</CardBody>
									<CardHeader>
										<h4
											className={`w-44 overflow-hidden text-ellipsis whitespace-nowrap text-center text-small uppercase antialiased`}
										>
											{item.name}
										</h4>
									</CardHeader>
								</Card>
							</Link>
						))}
				</div>
			</section>
		);
	};

	return (
		<section className="pt-4">
			<div className="lg:ml-1">
				<SeriesSearchBar />
			</div>
			<div className="lg:ml-1">
				{HomepageDataFormatter("Popular Series", popular_data)}
				<div className="mt-2">
					{HomepageDataFormatter("Trending Series", trending_data)}
				</div>
				<div className="mt-2">
					{HomepageDataFormatter("Top Rated Series", top_data)}
				</div>
			</div>
		</section>
	);
};

export default SeriesHomepage;
