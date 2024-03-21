"use client";

import "./search.css";
import { FaSearch } from "react-icons/fa"; // Import the search icon from react-icons library
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import testFunction from "./api/fetchInfo";

export default function Input() {
	const [searchedAnime, setSearchedAnime] = useState(null);
	const [loading, setLoading] = useState(null);
	const [search1, setSearch] = useState(null);

	const handleKeyPress = async (event) => {
		if (
			(event.code === "Enter" ||
				event.key === "Enter" ||
				event.code === 13) &&
			searchedAnime != ""
		) {
			setLoading(true);
			let x = await testFunction(searchedAnime);
			setSearch(x);
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
						onChange={(event) =>
							setSearchedAnime(event.target.value)
						}
						onKeyDown={(event) => handleKeyPress(event)}
						placeholder="Enter anime title"
					></input>
				</div>
			</div>

			{loading && (
				<p style={{ color: "white", textAlign: "center" }}>
					Please wait while we crunch all the data for you.
				</p>
			)}
			<div className="animeEntry">
				{search1 ? (
					search1.results && search1.results.length > 0 ? (
						search1.results.map((item, index) => (
							<Link
								key={index}
								href={`/info/${item.id}`}
								style={{ textDecoration: "none" }}
							>
								<div className="anime">
									<p>{item.title}</p>
									<Image
										src={item.image}
										className="animeImage"
										width={120}
										height={160}
										alt="Drama Poster"
									/>
								</div>
							</Link>
						))
					) : (
						<div style={{ margin: "0px auto" }}>
							<p style={{ color: "white" }}>No results found</p>
						</div>
					)
				) : null}
			</div>
		</div>
	);
}
