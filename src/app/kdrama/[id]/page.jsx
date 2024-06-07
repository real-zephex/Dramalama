import { Chip, Image } from "@nextui-org/react";
import DescriptionTabs from "../components/infoTabs";
import { dramaInfo } from "../components/requests";
import EpisodesContainer from "../components/episodesContainer";
import { PreFetchVideoLinks } from "../components/cacher";

export default async function DramaInfo({ params }) {
	const id = decodeURIComponent(params.id);
	const data = await dramaInfo(id);

	PreFetchVideoLinks(data.episodes, data.id);

	return (
		<section
			style={{
				backgroundImage: `radial-gradient(gray 1px, transparent 1px)`,
				backgroundSize: "40px 40px",
			}}
			className="h-screen bg-white dark:bg-black"
		>
			<section className="to-white-400 absolute inset-0 bg-gradient-to-b from-transparent dark:to-black">
				<section className="m-auto pt-16 lg:w-9/12">
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
							<div className="mt-1">
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
			</section>
		</section>
	);
}
