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
								href={{
									pathname: `/manga/info/read/${item.id}`,
									query: {
										name: item.title,
									},
								}}
							>
								<button key={index}>
									{item.volumeNumber} - {item.chapterNumber}
								</button>
							</Link>
						);
					}
				})}
		</div>
	);
}
