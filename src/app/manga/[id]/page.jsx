import { MangaInfoResults } from "../components/requests";
import Image from "next/image";
import { Chip } from "@nextui-org/react";

import MangaDescriptionTabs from "../components/descriptionTabs";

const MangaInfoPage = async ({ params }) => {
	const { id } = params;

	const data = await MangaInfoResults(id);

	return (
		<section className="m-auto w-full lg:w-9/12">
			<div className="flex items-center p-2">
				<Image
					src={data.image}
					width={170}
					height={280}
					className="rounded-lg"
					alt="Manga Poster"
				/>
				<div className="ml-2">
					<h3 className="text-2xl">
						{data.title.english || data.title.romaji}
					</h3>
					{data.genres &&
						data.genres.map((item, index) => (
							<Chip
								key={index}
								color="warning"
								variant="faded"
								size="sm"
								className="mr-1"
							>
								{item}
							</Chip>
						))}
				</div>
			</div>
			<MangaDescriptionTabs data={data} />
		</section>
	);
};

export default MangaInfoPage;
