import { Card, CardHeader, CardBody, Link } from "@nextui-org/react";
import Image from "next/image";

export const metadata = {
	title: "Dramalama K-Drama",
	description: "k-drama page for Dramalama",
};

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
			<p className="my-1 text-2xl font-bold text-sky-400 antialiased">
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
									alt="Kdrama Poster"
									src={`https://sup-proxy.zephex0-f6c.workers.dev/api-content?url=${item.image}`}
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
