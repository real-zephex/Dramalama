import { Card, CardHeader, CardBody } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import styles from "../../page.module.css";

const MovieSearchFormatter = async (data) => {
	return (
		<section
			className={`mb-2 flex items-center overflow-auto pb-2 ${styles.ScrollBarAdjuster}`}
		>
			{data &&
				data.results.map((item, index) => {
					if (item.poster_path) {
						return (
							<Link
								key={index}
								href={`/movies/${item.id}`}
								aria-label="anime redirection links"
								className="mx-1 flex flex-col items-center"
							>
								<Card
									className="overflow-hidden"
									isPressable
									isHoverable
									shadow="sm"
								>
									<CardBody>
										<Image
											alt="Searched Movie Poster"
											src={`https://sup-proxy.zephex0-f6c.workers.dev/api-content?url=https://image.tmdb.org/t/p/original${item.poster_path}`}
											width={190}
											height={120}
											className="h-64 rounded-md"
											priority
										/>
									</CardBody>
									<CardHeader>
										<h4
											className={`w-44 overflow-hidden text-ellipsis whitespace-nowrap text-center text-small uppercase antialiased`}
										>
											{item.original_title}
										</h4>
									</CardHeader>
								</Card>
							</Link>
						);
					}
				})}
		</section>
	);
};

export default MovieSearchFormatter;
