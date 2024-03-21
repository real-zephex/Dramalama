import "./anime.css";
import Trending from "../top-airing/page";
import Releases from "../recent/page";
import Input from "../search/page";

export default async function Anime() {
	return (
		<div>
			<Input />
			<Trending />
			<Releases />
		</div>
	);
}
