"use client";

import { storeLocal } from "./storeHistory";

export default function store_to_local(name, image, episode, id) {
	const currentDate = new Date();

	try {
		let newData = {
			name: name,
			image: image,
			episode: episode,
			id: id,
			type: "anime",
			date: `${currentDate.getDate()}-${String(
				currentDate.getMonth() + 1
			).padStart(2, "0")}`,
			time: `${currentDate.getHours()}:${String(
				currentDate.getMinutes()
			).padStart(2, "0")}`,
		};
		storeLocal(newData);
	} catch (error) {
		console.error(
			"Some error occurred during the process of saving your watch history to local storage. Please try again or contact us on GitHub if this issue persists.",
			error.message
		);
	}
}
