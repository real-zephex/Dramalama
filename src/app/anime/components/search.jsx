"use client";

import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import { Input, Link, Button, Progress } from "@nextui-org/react";

import SearchResults from "./search_results";

const SearchBar = () => {
	const [title, setTitle] = useState("");
	const [searchResults, setSearchResults] = useState(null);
	const [loading, setLoading] = useState(false);

	const handleSearchInput = async (title) => {
		setSearchResults(null);
		setLoading(
			<Progress
				size="sm"
				isIndeterminate
				aria-label="Loading..."
				className="w-full mt-2 lg:w-1/2"
			/>
		);
		setSearchResults(await SearchResults(title));
		setLoading(false);
	};

	return (
		<main>
			<section>
				<div className="flex w-full md:flex-nowrap gap-2 lg:w-1/2">
					<Input
						type="text"
						label="Search for anime"
						placeholder="Enter anime title here"
						autoComplete="off"
						onKeyDown={async (event) => {
							if (
								event.code === "Enter" ||
								event.key === "Enter" ||
								event.code === 13
							) {
								await handleSearchInput(title);
							}
						}}
						onChange={(event) => {
							if (event.target.value.trim() != "") {
								setTitle(event.target.value);
							}
						}}
						startContent={<FaSearch />}
					/>

					<Link href={"/anime/continueWatching"}>
						<Button color="primary">History</Button>
					</Link>
				</div>
				{loading}
			</section>
			<div className="mt-2">{searchResults}</div>
		</main>
	);
};

export default SearchBar;
