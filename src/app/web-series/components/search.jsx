"use client";

import { useState } from "react";
import { Input, Progress } from "@nextui-org/react";

import { SEARCH_TV } from "./data-fetch";
import SeriesSearchFormatter from "./seriesSearchFormatter";
import PreFecthSeriesInfo from "./cacher";

const SeriesSearchBar = () => {
	const [seriesTitle, setSeriesTitle] = useState("");
	const [loading, setLoading] = useState(<></>);
	const [seriesResults, setSeriesResults] = useState(<></>);

	async function handleInputChange() {
		setLoading(
			<Progress
				size="sm"
				isIndeterminate
				aria-label="Loading..."
				className="w-full"
			/>,
		);
		const data = await SEARCH_TV(seriesTitle);
		PreFecthSeriesInfo(data);
		setLoading(<></>);
		setSeriesResults(await SeriesSearchFormatter(data));
	}

	return (
		<section>
			<div className="flex w-full flex-col gap-2 md:flex-nowrap lg:w-1/2">
				<Input
					type="text"
					label="Search for series"
					placeholder="Enter series title"
					onChange={(event) => {
						if (event.target.value.trim() !== "") {
							setSeriesTitle(event.target.value);
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
			<div className="mt-2">{seriesResults}</div>
		</section>
	);
};

export default SeriesSearchBar;
