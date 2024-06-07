import { Chip, Image } from "@nextui-org/react";

import { anime_info } from "../data-fetch/request";
import DescriptionTabs from "../components/infoTabs";
import EpisodesContainer from "../components/vidButtonContainer";
import { preFetchVideoLinks } from "../components/cacher";

const AnimeInfoHomepage = async ({ params }) => {
	const id = params.id;
	const data = await anime_info(id);

	if (data.episodes.length > 50) {
	} else {
		preFetchVideoLinks(data.episodes);
	}

	return (
		<section className="m-auto lg:w-9/12">
			<div className="flex items-center justify-center md:justify-start lg:justify-start">
				<Image
					isBlurred
					width={190}
					src={data.image.toString()}
					alt="Anime Title Poster"
					className="m-2"
				/>
				<div className="mx-5">
					<h4 className={`text-2xl`}>
						<strong>{data.title}</strong>
					</h4>
					<div>
						{data.genres &&
							data.genres.map((item, index) => (
								<Chip
									key={index}
									color="warning"
									variant="faded"
									className="mb-1 mr-1"
								>
									<p className="text-xs">{item}</p>
								</Chip>
							))}
					</div>
				</div>
			</div>
			<DescriptionTabs data={data} />
			<EpisodesContainer data={data} />
			<br />
			<br />
			<br />
		</section>
	);
};

export default AnimeInfoHomepage;
