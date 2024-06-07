import { search_results } from "../data-fetch/request";
import { preFetchAnimeInfo } from "./cacher";
import styles from "../../page.module.css";

import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import Link from "next/link";
import Image from "next/image";

const SearchResults = async (title) => {
	const data = await search_results(title);

	preFetchAnimeInfo(data);

	return (
		<section
			className={`flex items-center overflow-auto pb-2 ${styles.ScrollBarAdjuster} `}
		>
			{data &&
				data.results.map((item, index) => (
					<Link
						key={index}
						href={`/anime/${item.id}`}
						aria-label="anime redirection links"
						className="mx-1 flex flex-col items-center"
						title={item.title}
					>
						<Card
							className="overflow-hidden"
							isPressable
							isHoverable
							shadow="sm"
						>
							<CardBody>
								<Image
									alt="Searched Anime Poster"
									src={item.image}
									width={190}
									height={120}
									className="h-64 rounded-md"
									priority
								/>
							</CardBody>
							<CardFooter>
								<h4
									className={`w-44 overflow-hidden text-ellipsis whitespace-nowrap text-center text-small uppercase antialiased`}
								>
									{item.title}
								</h4>
							</CardFooter>
						</Card>
					</Link>
				))}
		</section>
	);
};

export default SearchResults;
