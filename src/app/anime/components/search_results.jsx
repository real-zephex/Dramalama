"use server";

import { search_results } from "../data-fetch/request";
import { preFetchAnimeInfo } from "./cacher";
import styles from "../../page.module.css";

import { Card, CardHeader, CardBody } from "@nextui-org/react";
import Link from "next/link";
import Image from "next/image";

const SearchResults = async (title) => {
	const data = await search_results(title);

	preFetchAnimeInfo(data);

	return (
		<section
			className={`flex items-center overflow-auto pb-2 ${styles.ScrollBarAdjuster}`}
		>
			{data &&
				data.results.map((item, index) => (
					<Link
						key={index}
						href={`/anime/${item.id}`}
						aria-label="anime redirection links"
						className="flex flex-col items-center mx-1 "
					>
						<Card className="overflow-hidden" isPressable>
							<CardBody>
								<Image
									alt="Searched Anime Poster"
									src={item.image}
									width={190}
									height={120}
									className="rounded-md h-64"
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
		</section>
	);
};

export default SearchResults;
