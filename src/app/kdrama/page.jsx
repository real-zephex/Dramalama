import { Card, CardHeader, CardBody, Image, Link } from "@nextui-org/react";
import NextImage from "next/image";

import { DramaDataFetcher } from "./components/requests";
import styles from "../page.module.css";
import { Searchbar } from "./components/searchBar";
import { PreFetchKdramaInfo } from "./components/cacher";

const KdramaHomepage = async () => {
	const recent_data = await DramaDataFetcher("recent");
	const popular_data = await DramaDataFetcher("popular");

	const dataToBeLoaded = [recent_data, popular_data];

	for (let item of dataToBeLoaded) {
		PreFetchKdramaInfo(item);
	}

	const header = (title) => (
		<>
			<p className="antialiased font-bold text-sky-400 text-2xl my-1">
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
						href={`/kdrama/${encodeURIComponent(item.id)}`}
						aria-label="anime redirection links"
						className="flex flex-col items-center mx-1"
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
			<div>
				<Searchbar />
			</div>
			<div className="mx-2">
				{header("Popular K-dramas")}
				<div
					className={`flex overflow-auto overflow-y-hidden pb-3 ${styles.ScrollBarAdjuster}`}
				>
					{format(popular_data)}
				</div>
			</div>
			<div className="mx-2">
				{header("Recent Releases")}
				<div
					className={`flex overflow-auto overflow-y-hidden pb-3 ${styles.ScrollBarAdjuster}`}
				>
					{format(recent_data)}
				</div>
			</div>

			<br />
			<br />
			<br />
			<br />
			<br />
		</section>
	);
};

export default KdramaHomepage;
