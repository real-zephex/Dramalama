"use client";

import React, { useState, useEffect } from "react";
import NextImage from "next/image";
import { CarFooter, Image, Link } from "@nextui-org/react";

const ContinueWatching = () => {
	const [localItems, setLocalItems] = useState(null);

	useEffect(() => {
		const newData = get_local();
		setLocalItems(newData);
	}, []); // Empty dependency array means this effect runs only once after the initial render

	function get_local() {
		try {
			const data = localStorage.getItem("data");
			return JSON.parse(data);
		} catch (error) {
			console.log("error", error);
			return false;
		}
	}

	return (
		<main className="pt-12">
			<p className="text-sky-400 text-2xl uppercase">Continue Watching</p>
			{localItems && (
				<div className="flex flex-col m-auto lg:w-[95%] ">
					{localItems.watchHis &&
						localItems.watchHis.map((item, index) => (
							<Link
								href={`/${item.type}/${item.id}`}
								key={index}
								color="foreground"
								className="mt-4 bg-gray-300 p-2 dark:bg-[#1f1f1f] rounded-lg"
							>
								<div className="flex items-center justify-between w-full">
									<div>
										<p className="font-bold text-xl lg:text-2xl w-3/5">
											{item.name}
										</p>
										<p>Episode: {item.episode}</p>
									</div>
									<Image
										as={NextImage}
										isZoomed
										isBlurred
										shadow="lg"
										src={item.image}
										width={180}
										height={300}
										alt="Continue anime poster"
										className="h-52 w-auto lg:h-64 lg:w-52"
										priority
									/>
								</div>
							</Link>
						))}
				</div>
			)}
		</main>
	);
};

export default ContinueWatching;
