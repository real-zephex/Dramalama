import { Card, CardHeader, CardBody, Link } from "@nextui-org/react";
import Image from "next/image";
import styles from "../page.module.css";

export const metadata = {
	title: "Dramalama Anime",
	description: "Anime page for Dramalama",
};

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
			<p className={`my-1 text-3xl font-bold text-sky-400 antialiased`}>
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
						className="flex flex-col items-center"
						title={item.title}
					>
						<Card
							className="overflow-visible bg-stone-800"
							isPressable
							isHoverable
							shadow="sm"
						>
							<CardBody>
								<Image
									alt="Anime Poster"
									src={`https://sup-proxy.zephex0-f6c.workers.dev/api-content?url=${item.image}`}
									width={270}
									height={170}
									className="h-64 overflow-hidden rounded-md w-auto"
									priority
								/>
							</CardBody>
							<CardHeader>
								<h4
									className={`w-44 overflow-hidden text-ellipsis whitespace-nowrap text-center text-small uppercase antialiased`}
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
		<section className="pt-4">
			<div className="mx-2">
				<SearchBar />
			</div>

			<div className="p-1">
				{header("Popular Animes")}
				<div
					className={`flex overflow-auto pb-3 2xl:grid 2xl:grid-cols-9 xl:grid xl:grid-cols-6 xl:overflow-none lg:grid lg:grid-cols-5 gap-2 ${styles.ScrollBarAdjuster}`}
				>
					{format(popular_data)}
				</div>
			</div>

			<div className="mx-2">
				{header("Recent Animes")}
				<div
					className={`flex overflow-auto pb-3 2xl:grid 2xl:grid-cols-9 xl:grid xl:grid-cols-6 xl:overflow-none lg:grid lg:grid-cols-5 gap-2 ${styles.ScrollBarAdjuster}`}
				>
					{format(recent_data)}
				</div>
			</div>
			<div className="mx-2">
				{header("Top Airing Animes")}
				<div
					className={`flex overflow-auto pb-3 2xl:grid 2xl:grid-cols-9 xl:grid xl:grid-cols-6 xl:overflow-none lg:grid lg:grid-cols-5 gap-2 ${styles.ScrollBarAdjuster}`}
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
