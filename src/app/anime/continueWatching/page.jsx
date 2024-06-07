"use client";

import React, { useState, useEffect } from "react";
import { Card, CardBody, Image } from "@nextui-org/react";
import Link from "next/link";

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
		<main>
			<p className="text-sky-400 text-2xl">Continue Watching</p>
			{localItems && (
				<div className="flex flex-col">
					{localItems.watchHis &&
						localItems.watchHis.map((item, index) => (
							<Link
								href={`/${item.type}/${item.id}`}
								key={index}
								color="foreground"
								className="mb-2 bg-gray-300 dark:bg-[#1f1f1f] rounded-lg"
							>
								<Card
									isPressable
									isHoverable
									shadow="sm"
									className="flex flex-row items-center w-full"
								>
									<Image
										isBlurred
										shadow="sm"
										src={item.image}
										width={180}
										alt="Continue anime poster"
										className="p-1"
										priority
									/>
									<CardBody>
										<p className="text-xl">{item.name}</p>
										<p className="text-green-300">
											Episode Watching: {item.episode}
										</p>
									</CardBody>
								</Card>
							</Link>
						))}
				</div>
			)}
		</main>
	);
};

export default ContinueWatching;
