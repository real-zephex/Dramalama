"use client";

import { useState } from "react";
import { Input, Progress } from "@nextui-org/react";

import { SearchMovie } from "./requestsHandler";
import MovieSearchFormatter from "./searchFormatter";

const MovieSearchBar = () => {
	const [movieTitle, setMovieTitle] = useState("");
	const [loading, setLoading] = useState(<></>);
	const [movieResults, setMovieResults] = useState(<></>);

	async function handleInputChange() {
		setLoading(
			<Progress
				size="sm"
				isIndeterminate
				aria-label="Loading..."
				className="w-full"
			/>
		);
		const data = await SearchMovie(movieTitle);
		setLoading(<></>);
		setMovieResults(await MovieSearchFormatter(data));
	}

	return (
		<section>
			<div className="flex flex-col w-full md:flex-nowrap gap-2 lg:w-1/2">
				<Input
					type="text"
					label="Search for movie"
					placeholder="Enter movie title"
					onChange={(event) => {
						if (event.target.value.trim() !== "") {
							setMovieTitle(event.target.value);
						}
					}}
					onKeyDown={async (event) => {
						if (event.key === "Enter" || event.code === "Enter") {
							await handleInputChange();
						}
					}}
				/>
				{loading}
			</div>
			<div className="mt-2">{movieResults}</div>
		</section>
	);
};

export default MovieSearchBar;
