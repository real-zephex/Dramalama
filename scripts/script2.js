// video.html

const head = document.getElementById("head");
const outputDIV = document.getElementById("output");
const v1 = document.getElementById("movie-link");


// function to get series id from url
function getQueryParam(name) {
	const urlParams = new URLSearchParams(window.location.search);
	return urlParams.get(name);
};

// get series ID
const seriesID = getQueryParam("seriesID");
head.innerHTML = `<h1>${seriesID}</h1>`;
console.log(seriesID);
test();

let z = '';
async function test() {
	const infoUrl = `https://consumet-api-self-hosted.vercel.app/movies/dramacool/info?id=${seriesID}`;
	const { data: infoData } = await axios.get(infoUrl);

	if (infoData.episodes && infoData.episodes.length > 0) { // getting number of episodes and their respective links
		z += "</ul>";

		infoData.episodes.forEach((episode) => {
			const episodeTitle = episode.title;
			const episodeID = episode.id;

			z +=
				`<button class="watch-button" data-episode-id="${episodeID}">${episodeTitle}</button>`;
		});
		z += "</ul>";
	}

	outputDIV.innerHTML = z;
}

// function to detect clicks + update video player with the required link
let epiID;
document.addEventListener("click", async function (event) {
	if (event.target.classList.contains("watch-button")) {
		const button = event.target;
		epiID = button.getAttribute("data-episode-id");
	
		const watchUrl = `https://consumet-api-self-hosted.vercel.app/movies/dramacool/watch?episodeId=${epiID}&mediaId=${seriesID}`;
		try {

			const { data: Links } = await axios.get(watchUrl);
		// modifying url to play 1080p
			const videoURL = Links.sources[0].url.replace(".m3u8", ".1080.m3u8");
			v1.innerHTML = videoURL;
			v1.style.color = "white";
			v1.style.textAlign = "center";
			v1.style.marginTop = "10px";
			// v1.style.overflow = 

		// making the video player work
			if (Hls.isSupported()) {
				var video = document.getElementById('video');
				var hls = new Hls();
				hls.loadSource(videoURL);
				hls.attachMedia(video);
			}

		} catch (error) {
			console.log(error)
		};
}
})