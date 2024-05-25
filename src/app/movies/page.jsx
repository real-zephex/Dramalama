import { Card, CardHeader, CardBody, Image, Link } from "@nextui-org/react";
import NextImage from "next/image";

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
				<p className="text-sky-400 text-2xl font-bold">{title}</p>

				<div
					className={`flex items-center overflow-auto pb-2 mt-1 ${styles.ScrollBarAdjuster}`}
				>
					{data &&
						data.results.map((item, index) => (
							<Link
								key={index}
								href={`/movies/${item.id}`}
								aria-label="anime redirection links"
								className="flex flex-col items-center mx-1 "
							>
								<Card className="overflow-visible " isPressable>
									<CardBody>
										<Image
											as={NextImage}
											isBlurred
											alt="Anime Poster"
											src={`https://sup-proxy.zephex0-f6c.workers.dev/api-content?url=https://image.tmdb.org/t/p/original${item.poster_path}`}
											width={270}
											height={180}
											className="h-64 overflow-hidden"
											shadow="lg"
											priority
										/>
									</CardBody>
									<CardHeader>
										<h4
											className={`antialiased  text-small text-center uppercase w-44 overflow-hidden whitespace-nowrap text-ellipsis `}
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
		<main className="pt-12 ">
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
