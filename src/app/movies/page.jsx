import { Card, CardHeader, CardBody, Link } from "@nextui-org/react";
import Image from "next/image";

export const metadata = {
	title: "Dramalama Movies",
	description: "Movies page for Dramalama",
};

import MovieSearchBar from "./components/search";
import { MovieHomepageDataFetcher } from "./components/requestsHandler";
import PreFetchMovieInfo from "./components/cacher";
import styles from "../page.module.css";

export default async function MovieHomepage() {
	const popular_data = await MovieHomepageDataFetcher("popular");
	const trending_data = await MovieHomepageDataFetcher("trending");
	const top_data = await MovieHomepageDataFetcher("top");

	const dataToBeLoaded = [popular_data, trending_data];

	for (let items of dataToBeLoaded) {
		PreFetchMovieInfo(items);
	}

	const dataFormatter = (title, data) => {
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
								href={`/movies/${item.id}`}
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
											{item.original_title}
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
		<main className="pt-4">
			<div className="lg:ml-2">
				<MovieSearchBar />
			</div>
			<div className="lg:ml-1">
				{dataFormatter("Popular Movies", popular_data)}
				<div className="mt-2">
					{dataFormatter("Trending Movies", trending_data)}
				</div>
				<div className="mt-2">
					{dataFormatter("Top Rated Movies", top_data)}
				</div>
			</div>
			<br />
		</main>
	);
}
