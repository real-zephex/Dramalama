"use client";

export function storeLocal(watchData) {
	const jsonData = localStorage.getItem("data");
	const dataObject = jsonData ? JSON.parse(jsonData) : {};

	if (!dataObject.watchHis) {
		dataObject.watchHis = [];
	}

	let found = false;
	dataObject.watchHis.forEach((element) => {
		if (element.name === watchData.name) {
			let episode = watchData.episode;
			element.episode = episode;
			found = true;
		}
	});

	if (!found) {
		dataObject.watchHis.push(watchData);
	}

	let updatedData = JSON.stringify(dataObject);
	localStorage.setItem("data", updatedData);
}
