import { Chip, Image } from "@nextui-org/react";
import DescriptionTabs from "../components/infoTabs";
import { dramaInfo } from "../components/requests";
import EpisodesContainer from "../components/episodesContainer";

export default async function DramaInfo({ params }) {
	const id = decodeURIComponent(params.id);
	const data = await dramaInfo(id);

	return (
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
					<div className="mt-1">
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
	);
}
