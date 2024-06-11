"use client";

import {
	Input,
	Progress,
	Card,
	CardBody,
	Image,
	Chip,
} from "@nextui-org/react";
import Link from "next/link";
import { useState } from "react";

import { SearchedMangaResults } from "./requests";

const MangaSearchBox = () => {
	const [searchedMangaTitle, setMangaSearchedTitle] = useState("");
	const [results, setResults] = useState(
		<div className="mt-4 w-full">
			<p className="text-center">
				Start typing and results will show here
			</p>
		</div>
	);

	async function GetResults() {
		if (!searchedMangaTitle) {
			setResults(<></>);
			return;
		}
		setResults(
			<Progress
				size="sm"
				isIndeterminate
				aria-label="Loading..."
				className="mb-4 mt-4 w-full"
			/>
		);

		const data = await SearchedMangaResults(searchedMangaTitle);
		const format = (
			<div className="mt-2 w-full">
				{data && data.results && data.results.length > 0 ? (
					data.results.map((item, index) => (
						<Link href={`/manga/${item.id}`} key={index}>
							<Card
								isPressable
								isBlurred
								isHoverable
								shadow="sm"
								className="mb-2 flex w-full flex-row items-center"
							>
								<Image
									src={item.image}
									width={150}
									isBlurred
									shadow="sm"
									className="p-1"
									fetchPriority="high"
								/>
								<CardBody>
									<p className="text-xl">
										{item.title.english ||
											item.title.romaji}
									</p>
									<section>
										{item.genres &&
											item.genres.map((item, index) => (
												<Chip
													key={index}
													size="sm"
													color="warning"
													variant="faded"
													className="mr-1"
												>
													{item}
												</Chip>
											))}
									</section>
								</CardBody>
							</Card>
						</Link>
					))
				) : (
					<p className="text-center">
						No results found for the searched title
					</p>
				)}
			</div>
		);
		setResults(format);
	}
	return (
		<main>
			<div className="flex w-full flex-wrap">
				<Input
					type="text"
					autoFocus
					label="Manga"
					placeholder="Enter manga/manhwa title"
					value={searchedMangaTitle}
					onChange={(event) => {
						setMangaSearchedTitle(event.target.value);
					}}
					onKeyDown={async (event) => {
						if (event.key === "Enter" || event.code === "Enter") {
							await GetResults();
						}
					}}
				/>
				{results}
			</div>
		</main>
	);
};

export default MangaSearchBox;
