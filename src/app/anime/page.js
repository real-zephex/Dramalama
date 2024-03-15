import './anime.css'
import Trending from '../top-airing/page'
import Releases from '../recent/page'

export default async function Anime() {
	return (
		<div>
			<Trending />
			<Releases />	
		</div>
	)
}