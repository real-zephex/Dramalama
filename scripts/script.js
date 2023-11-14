// index.html

x = document.getElementById("name");
phew = document.getElementById("output");
const loadingOverlay = document.getElementById('loading-overlay');

// detecting clicks on watch now button
document.addEventListener("click", function(event) {
	if (event.target.classList.contains("watch-button")) {
		const button = event.target;
		const identifier = button.getAttribute("data-identifier");
		window.open("video.html?seriesID="+identifier);
	};
});

// detecting enter presses 
x.addEventListener("keydown", keyhandler);
function keyhandler(event) {
	if (event.key === "Enter" || event.keyCode === 13) { 
		video_function()
	}
} 

// main video function
async function video_function() {
	loadingOverlay.style.display = 'flex'; // loading the animation
	const movie_name = x.value;
	
	if (movie_name === "") {
		loadingOverlay.style.display = "none";
		return;
	}
	// searching for movie 
	const search_url = `https://consumet-api-self-hosted.vercel.app/movies/dramacool/${movie_name}?page=1`;

	try {
		const {data} = await axios.get(search_url);
		const results = data.results;

		let y = '';
		for (let i = 0; i < results.length; i++) {
			const id = results[i].id;
			const info_url = `https://consumet-api-self-hosted.vercel.app/movies/dramacool/info?id=${id}`; // getting movie info
			const { title, image, description} = (await axios.get(info_url)).data;

			y += `<p class="movie-heading"> <b>${title}</b> </p>`;
			y += `<img class="movie-poster" src=${image}>`;
			y += `<p class="movie-desc"> ${description} </p>`
			y += `<button class="watch-button" data-identifier="${id}"> Watch Now </button>`
		}
		phew.innerHTML = y;
	loadingOverlay.style.display = 'none';


	} catch (error) {
		console.log("Some error occured", error);
	}
}