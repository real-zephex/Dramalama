"use client";

import React from "react";
import { useState } from "react";
import { Input, Progress } from "@nextui-org/react";

import { SearchedDramaData } from "./requests";
import SearchedDataFormatter from "./searchFormatter";
import { PreFetchKdramaInfo } from "./cacher";

export const Searchbar = () => {
	const [loading, setLoading] = useState(<></>);
	const [searchData, setSearchData] = useState(null);
	const [searchTitle, setSearchTitle] = useState("");

	async function handleSearchInput() {
		setSearchData(null);
		setLoading(
			<Progress
				size="sm"
				isIndeterminate
				aria-label="Loading..."
				className="w-full"
			/>
		);
		const data = await SearchedDramaData(searchTitle);
		PreFetchKdramaInfo(data);
		const format = await SearchedDataFormatter(data);
		setSearchData(format);
		setLoading(<></>);
	}

	return (
		<div>
			<div className="flex w-full flex-wrap flex-col mt-2  md:flex-nowrap md:mx-2 gap-4 lg:w-1/2 lg:mx-2">
				<Input
					type="text"
					label="Search for k-dramas here"
					placeholder="Enter k-drama title"
					color="default"
					onChange={(event) => {
						if (event.target.value.trim() !== "") {
							setSearchTitle(event.target.value);
						}
					}}
					onKeyDown={async (event) => {
						if (event.key === "Enter" || event.code === "Enter") {
							await handleSearchInput();
						}
					}}
				/>
				{loading}
			</div>
			<div className="w-full mt-2">{searchData}</div>
		</div>
	);
};
