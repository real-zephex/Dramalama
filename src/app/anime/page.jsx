import styles from "./anime.module.css";
import Trending from "./top-airing/page";
import Releases from "./recent/page";
import Popular from "./popular/page";
import Input from "./search/page";

export default async function Anime() {
	return (
		<div className={styles.main}>
			<Input />
			<Trending />
			<br />
			<Releases />
			<br />
			<Popular />
		</div>
	);
}
