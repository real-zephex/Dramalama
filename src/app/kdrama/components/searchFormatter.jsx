import { Card, CardHeader, CardBody } from "@nextui-org/react";
import Link from "next/link";
import Image from "next/image";

import styles from "../../page.module.css";

const SearchedDataFormatter = async (data) => {
	return (
		<section
			className={`flex items-center overflow-auto pb-2 ${styles.ScrollBarAdjuster}`}
		>
			{data &&
				data.results.length > 0 &&
				data.results.map((item, index) => (
					<Link
						key={index}
						href={`/kdrama/${encodeURIComponent(item.id)}`}
						aria-label="anime redirection links"
						className="mx-1 flex flex-col items-center"
						title={item.title}
					>
						<Card
							className="overflow-hidden"
							isPressable
							isHoverable
							shadow="sm"
						>
							<CardBody>
								<Image
									alt="Searched Kdrama Poster"
									src={item.image}
									width={185}
									height={120}
									className="h-64 rounded-md"
									priority
								/>
							</CardBody>
							<CardHeader>
								<h4 className="w-44 overflow-hidden text-ellipsis whitespace-nowrap text-center text-small uppercase antialiased">
									{item.title}
								</h4>
							</CardHeader>
						</Card>
					</Link>
				))}
		</section>
	);
};

export default SearchedDataFormatter;
