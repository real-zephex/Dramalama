"use client"

import './search.css'
import { FaSearch } from 'react-icons/fa'; // Import the search icon from react-icons library
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Input() {

	const [searchedAnime, setSearchedAnime] = useState(null)

	const handleKeyPress = (event) => {
		if (
			(event.code === "Enter" || 
			event.key === "Enter" || 
			event.code === 13) && 
			searchedAnime != ""
		) {
			fetch_animes(searchedAnime)
		} else if (
			(event.code === "Enter" || 
			event.key === "Enter" || 
			event.code === 13) &&
			searchedAnime === ""
			) {
			alert("Input cannot be empty")
		}
	}

	const [search1, setSearch] = useState(null);
	const fetch_animes = (title) => {
		fetch("https://dramalama-api.vercel.app/anime/gogoanime/" + title)
			.then(res => res.json())
			.then(
				data => {
					setSearch(data)
					console.log(search1)
				}
			)
	}

	return (
		<div>
			<div className='inputContainer'>
				<div className='searchContainer'>
					<FaSearch className='searchIcon' />
					<input 
						onChange={(event) => setSearchedAnime(event.target.value)}
						onKeyDown={(event) => handleKeyPress(event)}
						placeholder='Enter anime title'>
						
					</input>
				</div>
			</div>

			<div className='animeEntry'>
				{search1 && search1.results.map((item, index) => (
					<Link key={index} href={`/info/${item.id}`} style={{textDecoration: "none"}}>
						<div className='anime'>
							<p>{item.title}</p>
							<Image 
								src={item.image}
								className='animeImage'
								width={120}
								height={160}
							/>
						</div>
					</Link>
				))}
			</div>
		</div>

	)
}