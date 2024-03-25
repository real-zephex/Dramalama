import styles from "./read.module.css";
import Image from "next/image";
import DownloadManga from "./download";

export default async function Read({ params }) {
	const chapterId = params.read;
	const data = await getPages(chapterId);
	if (data.length === 0) {
		return (
			<div className={styles.NotFound}>
				<p>
					This chapter has no content. Please check the next chapter.
				</p>
			</div>
		);
	}

	let images = [];
	for (var i = 0; i < data.length; i++) {
		var imgUrl = data[i].img;
		images.push(imgUrl);
	}

	return (
		<div className={styles.Main}>
			<div className={styles.ImageContainer}>
				<DownloadManga chapterId={chapterId} />
				{images &&
					images.map((item, index) => (
						<div className={styles.Image} key={index}>
							<Image
								src={`https://image-proxy-manga.vercel.app/image-proxy?url=${item}`}
								key={index}
								alt="Pages"
								width={800}
								height={1000}
								priority
							/>
							<p>{index + 1}</p>
						</div>
					))}
			</div>
		</div>
	);
}

async function getPages(id) {
	const res = await fetch(
		`https://consumet-api-di2e.onrender.com/meta/anilist-manga/read?chapterId=${id}&provider=mangadex`
	);
	const data = await res.json();
	return data;
}
