import './anime.css'
import Image from 'next/image'

export default async function Anime() {
	return (
		<div>
			<div className='underDev'>
				<Image
					src="/WIP.png"
					width={"250"}
					height={"250"}
				>
				</Image>
			</div>
		</div>
	)
}