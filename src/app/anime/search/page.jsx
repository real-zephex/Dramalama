"use client";

import "./search.css";
import { FaSearch } from "react-icons/fa"; // Import the search icon from react-icons library
import { useState } from "react";
import Results from "./components/fetchInfo";
import fetchedInfo from "./components/fetchedInfo";

export default function Input() {
	const [searchedAnime, setSearchedAnime] = useState(null);
	const [loading, setLoading] = useState(null);
	const [info, setInfo] = useState(null);

	const handleKeyPress = async (event) => {
		if (
			(event.code === "Enter" ||
				event.key === "Enter" ||
				event.code === 13) &&
			searchedAnime !== ""
		) {
			setLoading(true);
			setInfo(await fetchedInfo(await Results(searchedAnime)));
			setLoading(false);
		} else if (
			(event.code === "Enter" ||
				event.key === "Enter" ||
				event.code === 13) &&
			searchedAnime === ""
		) {
			alert("Input cannot be empty");
		}
	};

	return (
		<div>
			<div className="inputContainer">
				<div className="searchContainer">
					<FaSearch className="searchIcon" />
					<input
						onChange={(event) => {
							if (event.target.value.trim() !== "") {
								setSearchedAnime(event.target.value);
							}
						}}
						onKeyDown={(event) => handleKeyPress(event)}
						placeholder="Enter anime title"
					></input>
				</div>
			</div>

			{loading && (
				<p
					style={{
						textAlign: "center",
						fontFamily: "Kanit",
						fontSize: 18,
						color: "white",
					}}
				>
					Please wait while we crunch all the data for you
				</p>
			)}

			{info}
		</div>
	);
}
