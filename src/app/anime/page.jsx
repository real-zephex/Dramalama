import { Card, CardHeader, CardBody, Image, Link } from "@nextui-org/react";
import NextImage from "next/image";
import styles from "../page.module.css";

import { top_airing, recent, popular } from "./data-fetch/request";
import SearchBar from "./components/search";
import { preFetchAnimeInfo } from "./components/cacher";

const AnimeHomepage = async () => {
	const popular_data = await popular();
	const recent_data = await recent();
	const airing_data = await top_airing();

	const dataToBeLoaded = [popular_data, recent_data, airing_data];

	for (let item of dataToBeLoaded) {
		preFetchAnimeInfo(item);
	}

	const header = (title) => (
		<>
			<p className={`antialiased font-bold text-sky-400 text-2xl my-1`}>
				{title}
			</p>
		</>
	);

	const format = (data) => (
		<>
			{data &&
				data.results.map((item, index) => (
					<Link
						key={index}
						href={`/anime/${item.id}`}
						aria-label="anime redirection links"
						className="flex flex-col items-center mx-1 "
					>
						<Card className="overflow-visible " isPressable>
							<CardBody>
								<Image
									as={NextImage}
									isBlurred
									alt="Anime Poster"
									src={item.image}
									width={270}
									height={160}
									className="h-60 overflow-hidden"
									shadow="lg"
									priority
								/>
							</CardBody>
							<CardHeader>
								<h4
									className={`antialiased  text-small text-center uppercase w-44 overflow-hidden whitespace-nowrap text-ellipsis `}
								>
									{item.title}
								</h4>
							</CardHeader>
						</Card>
					</Link>
				))}
		</>
	);

	return (
		<section className="pt-12">
			<div className="mx-2">
				<SearchBar />
			</div>

			<div className="mx-2">
				{header("Popular Animes")}
				<div
					className={`flex overflow-auto overflow-y-hidden pb-3 ${styles.ScrollBarAdjuster}`}
				>
					{format(popular_data)}
				</div>
			</div>

			<div className="mx-2">
				{header("Recent Animes")}
				<div
					className={`flex overflow-auto overflow-y-hidden pb-3 ${styles.ScrollBarAdjuster}`}
				>
					{format(recent_data)}
				</div>
			</div>
			<div className="mx-2">
				{header("Top Airing Animes")}
				<div
					className={`flex overflow-x-auto overflow-y-hidden pb-3 ${styles.ScrollBarAdjuster}`}
				>
					{format(airing_data)}
				</div>
			</div>
			<br />
			<br />
		</section>
	);
};

export default AnimeHomepage;
