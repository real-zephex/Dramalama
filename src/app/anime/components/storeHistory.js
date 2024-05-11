"use client";

export function storeLocal(watchData) {
	const currentDate = new Date();
	const jsonData = localStorage.getItem("data");
	const dataObject = jsonData ? JSON.parse(jsonData) : {};

	if (!dataObject.watchHis) {
		dataObject.watchHis = [];
	}

	let found = false;
	dataObject.watchHis.forEach((element) => {
		if (element.name === watchData.name) {
			let episode = watchData.episode;
			let date = `${currentDate.getDate()}-${String(
				currentDate.getMonth() + 1
			).padStart(2, "0")}`;
			let time = `${currentDate.getHours()}:${String(
				currentDate.getMinutes()
			).padStart(2, "0")}`;
			element.episode = episode;
			element.date = date;
			element.time = time;
			found = true;
		}
	});

	if (!found) {
		dataObject.watchHis.push(watchData);
	}

	let updatedData = JSON.stringify(dataObject);
	localStorage.setItem("data", updatedData);
}
