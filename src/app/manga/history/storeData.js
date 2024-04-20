"use client";

export function storeLocal(watchData) {
	const jsonData = localStorage.getItem("mangaData");
	const dataObject = jsonData ? JSON.parse(jsonData) : {};

	if (!dataObject.watchHis) {
		dataObject.watchHis = [];
	}

	let found = false;
	dataObject.watchHis.forEach((element) => {
		if (element.title === watchData.title) {
			let chapter = watchData.chapter;
			let volume = watchData.volume;
			element.chapter = chapter;
			element.volume = volume;
			found = true;
		}
	});

	if (!found) {
		dataObject.watchHis.push(watchData);
	}

	let updatedData = JSON.stringify(dataObject);
	localStorage.setItem("mangaData", updatedData);
}
