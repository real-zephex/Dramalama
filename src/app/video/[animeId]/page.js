"use client"

import '../video.css'
import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';

export default function Video({ params }) {
    const id = params.animeId;
    const [videoLink, setVideoLink] = useState(null);
    const [loading, setLoading] = useState(true);
	const [epi, setEpi] = useState("");


    useEffect(() => {
        fetch("https://anime-sensei-api.vercel.app/anime/gogoanime/watch/" + id)
            .then(res => res.json())
            .then(data => {
				const words = id.split("-")
				const last_two = words.slice(-2).join(" ");
				const remainingWords = words.slice(0, -2).join(" ");
				setEpi([last_two, remainingWords])
                setVideoLink(data.sources[3].url);
                setLoading(false);
            })
            .catch(error => {
                console.log("Some error occured", error);
                setLoading(false);
            });
    }, [id]);

    return (
        <div>
            {loading && (
                <p style={{color: "white", fontFamily: "Lato", fontSize: "20px", textAlign: "center"}}>Loading...</p>
            )}
			{videoLink && (
				<div className='video2'>
					<p>{epi[0]} - {epi[1]}</p>
					<ReactPlayer 
						url={videoLink}
						controls
						autoplay
						width={400}
						height={"auto"}
					/>
				</div>
			)}
        </div>
    );
}
