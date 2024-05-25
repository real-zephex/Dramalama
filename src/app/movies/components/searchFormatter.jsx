import { Card, CardHeader, CardBody, Image, Link } from "@nextui-org/react";
import NextImage from "next/image";

import styles from "../../page.module.css";

const MovieSearchFormatter = async (data) => {
	return (
		<section
			className={`flex items-center overflow-auto pb-2 mb-2 ${styles.ScrollBarAdjuster}`}
		>
			{data &&
				data.results.map((item, index) => {
					if (item.poster_path) {
						return (
							<Link
								key={index}
								href={`/movies/${item.id}`}
								aria-label="anime redirection links"
								className="flex flex-col items-center mx-1 "
							>
								<Card className="overflow-hidden" isPressable>
									<CardBody>
										<Image
											as={NextImage}
											isBlurred
											alt="Anime Poster"
											src={`https://sup-proxy.zephex0-f6c.workers.dev/api-content?url=https://image.tmdb.org/t/p/original${item.poster_path}`}
											width={190}
											height={120}
											shadow="lg"
											className="h-64"
											priority
										/>
									</CardBody>
									<CardHeader>
										<h4
											className={`antialiased  text-small text-center uppercase w-44 overflow-hidden whitespace-nowrap text-ellipsis `}
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
