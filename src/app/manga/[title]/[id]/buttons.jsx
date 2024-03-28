import styles from "./info.module.css";
import Link from "next/link";

export default async function Buttons({ content: data }) {
	return (
		<div className={styles.ChapterContainer}>
			{data.chapters &&
				data.chapters.map((item, index) => {
					if (item.pages !== 0) {
						return (
							<Link
								key={index}
								href={{
									pathname: `/manga/info/read/${item.id}`,
									query: {
										name: item.title,
									},
								}}
							>
								<button key={index}>
									<div>
										<p>Chapter: {item.chapterNumber}</p>
										<p>Volume: {item.volumeNumber}</p>
									</div>
								</button>
							</Link>
						);
					}
				})}
		</div>
	);
}
