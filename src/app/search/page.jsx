"use client";

import "./search.css";
import { FaSearch } from "react-icons/fa"; // Import the search icon from react-icons library
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Input() {
	const [searchedAnime, setSearchedAnime] = useState(null);
	const [loading, setLoading] = useState(null);

	const handleKeyPress = (event) => {
		if (
			(event.code === "Enter" ||
				event.key === "Enter" ||
				event.code === 13) &&
			searchedAnime != ""
		) {
			fetch_animes(searchedAnime);
		} else if (
			(event.code === "Enter" ||
				event.key === "Enter" ||
				event.code === 13) &&
			searchedAnime === ""
		) {
			alert("Input cannot be empty");
		}
	};

	const [search1, setSearch] = useState(null);
	const fetch_animes = (title) => {
		fetch("https://dramalama-api.vercel.app/anime/gogoanime/" + title)
			.then(setLoading(true))
			.then((res) => res.json())
			.then((data) => {
				setSearch(data);
				setLoading(false);
			});
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
