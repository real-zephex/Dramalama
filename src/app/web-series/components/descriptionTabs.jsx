"use client";

import {
	Tabs,
	Tab,
	Card,
	CardBody,
	Link,
	Image,
	Chip,
} from "@nextui-org/react";
import { FiThumbsUp } from "react-icons/fi";
import { TiStarFullOutline } from "react-icons/ti";

import { lexend, atkinson } from "../../../../config/fonts";

export default function SeriesDescriptionTabs({ data: data }) {
	return (
		<div className="flex w-full flex-col">
			<Tabs aria-label="Options" className={lexend.className}>
				<Tab key="description" title="Description">
					<Card shadow="sm">
						<CardBody className={atkinson.className}>
							{data.overview || "No description found"}
						</CardBody>
					</Card>
				</Tab>
				<Tab key="episodes" title="Details">
					<Card shadow="sm">
						<CardBody className={lexend.className}>
							<h4>
								<strong>Tagline</strong>:{" "}
								<span>{data.tagline || "not sure"}</span>
							</h4>
							<h4>
								<strong>Homepage</strong>:{" "}
								<span>
									<Link
										color="warning"
										isExternal
										href={data.homepage || ""}
									>
										{data.homepage || "not sure"}
									</Link>
								</span>
							</h4>
							<h4>
								<strong className="text-success">
									Episodes:
								</strong>{" "}
								<span>
									{data.number_of_episodes || "not sure"}
								</span>
							</h4>
							<h4>
								<strong className="text-secondary">
									Seasons:
								</strong>{" "}
								<span>
									{data.number_of_seasons || "not sure"}
								</span>
							</h4>
							<h4>
								<strong>Status</strong>:{" "}
								<span>{data.status || "not sure"}</span>
							</h4>
							<h4>
								<strong>Released on</strong>:{" "}
								<span>{data.first_air_date || "not sure"}</span>
							</h4>
							<h4 className="flex items-center">
								<strong>
									<FiThumbsUp />
								</strong>
								<span className="ml-2">
									{data.vote_count || "not sure"}
								</span>
								<strong className="ml-3">
									<TiStarFullOutline />
								</strong>
								<span className="ml-2">
									{data.vote_average || "not sure"}
								</span>
							</h4>
						</CardBody>
					</Card>
				</Tab>
				<Tab key="seasons" title="Seasons">
					<Card shadow="sm">
						<CardBody>
							{data.seasons &&
								data.seasons.map((item, index) => (
									<Card
										key={index}
										className="flex flex-row items-center mb-1"
										isPressable
										shadow="sm"
									>
										<Image
											src={`https://sup-proxy.zephex0-f6c.workers.dev/api-content?url=https://image.tmdb.org/t/p/original${item.poster_path}`}
											width={100}
											isBlurred
											shadow="lg"
											className="p-1"
										></Image>
										<CardBody className="ml-1">
											<p className="text-sky-400">
												{item.name}
											</p>
											<Chip
												color="warning"
												size="sm"
												variant="faded"
												className="mt-1"
											>
												{item.air_date
													? item.air_date
													: "TBD	"}
											</Chip>
										</CardBody>
									</Card>
								))}
						</CardBody>
					</Card>
				</Tab>
			</Tabs>
		</div>
	);
}
