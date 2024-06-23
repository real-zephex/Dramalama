import { Image, Chip } from "@nextui-org/react";

import { SERIES_INFO } from "../components/data-fetch";
import Questions from "@/app/movies/components/faqs";
import SeriesDescriptionTabs from "../components/descriptionTabs";
import SeriesVideoPlayer from "../components/videoPlayer";

const SeriesInfoPage = async ({ params }) => {
	const { id } = params;

	const data = await SERIES_INFO(id);

	return (
		<section className="m-auto w-full pt-2 lg:w-9/12">
			<SeriesVideoPlayer id={data.id} />
			<div className="flex items-center">
				<Image
					isBlurred
					shadow="sm"
					src={`https://sup-proxy.zephex0-f6c.workers.dev/api-content?url=https://image.tmdb.org/t/p/original${data.poster_path}`}
					width={180}
					height={300}
					alt="Anime Title Poster"
					className="m-2"
				></Image>
				<div className="mx-5">
					<h4 className={`text-2xl`}>
						<strong>{data.name}</strong>
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
									<p className="text-xs">{item.name}</p>
								</Chip>
							))}
					</div>
				</div>
			</div>
			<SeriesDescriptionTabs data={data} />
			<Questions />
		</section>
	);
};

export default SeriesInfoPage;
