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
		<section
			style={{
				backgroundImage: `radial-gradient(gray 1px, transparent 1px)`,
				backgroundSize: "40px 40px",
			}}
			className="h-screen bg-white dark:bg-black"
		>
			<section className="absolute inset-0 bg-gradient-to-b from-transparent to-white dark:to-black">
				<section className="pt-12  lg:w-9/12 m-auto">
					<div className="flex items-center justify-center lg:justify-start md:justify-start">
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
											className="mr-1 mb-1"
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
			</section>
		</section>
	);
};

export default AnimeInfoHomepage;
