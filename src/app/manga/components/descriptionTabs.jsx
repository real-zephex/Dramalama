"use client";

import {
	Tabs,
	Tab,
	Card,
	CardBody,
	Divider,
	Image,
	Select,
	SelectItem,
	Button,
} from "@nextui-org/react";
import { FaRegThumbsUp, FaRegStar } from "react-icons/fa";
import Link from "next/link";
import { useState } from "react";

import MangaChapters from "./chapterPages";

const MangaDescriptionTabs = ({ data }) => {
	const [pages, setPages] = useState(<></>);
	const [url, setUrl] = useState("");

	async function get_pages(id) {
		setPages(<p className="text-center">Loading...</p>);
		setUrl(`https://mangadex-downloader.onrender.com/${id}`);
		const data = await MangaChapters(id);
		setPages(data);
	}

	return (
		<div className="flex w-full flex-col">
			<Tabs aria-label="Options">
				<Tab key="description" title="Description">
					<Card shadow="sm">
						<CardBody
							dangerouslySetInnerHTML={{
								__html: data.description,
							}}
						></CardBody>
					</Card>
				</Tab>
				<Tab key="details" title="Details">
					<Card shadow="sm">
						<CardBody>
							<h4>
								<strong>Status</strong>:{" "}
								<span>{data.status || "not sure"}</span>
							</h4>
							<h4>
								<strong>Type</strong>:{" "}
								<span>{data.type || "not sure"}</span>
							</h4>
							<h4>
								<strong className="text-green-400">
									Started on
								</strong>
								:{" "}
								<span>
									{data.startDate.day}-{data.startDate.month}-
									{data.startDate.year}
								</span>
							</h4>
							<h4>
								<strong className="text-red-400">
									Ended on
								</strong>
								:{" "}
								<span>
									{data.endDate.day}-{data.endDate.month}-
									{data.endDate.year}
								</span>
							</h4>
							<div className="flex items-center">
								<section className="flex items-center">
									<FaRegThumbsUp />
									<p className="ml-1">{data.popularity}</p>
								</section>
								<Divider orientation="vertical" />
								<section className="ml-2 flex items-center">
									<FaRegStar />
									<p className="ml-1">
										{Number(data.rating) / 10}
									</p>
								</section>
							</div>
						</CardBody>
					</Card>
				</Tab>
				<Tab key="recommendations" title="Recommendation">
					<Card shadow="sm">
						<CardBody>
							{data.recommendations &&
								data.recommendations.length > 0 &&
								data.recommendations.map((item, index) => (
									<Link
										key={index}
										href={`/manga/${item.id}`}
									>
										<Card
											isPressable
											isHoverable
											shadow="sm"
											className="mb-2 flex w-full flex-row items-center"
										>
											<Image
												width={120}
												src={item.image}
												className="p-1"
												shadow="lg"
												isBlurred
											/>
											<CardBody>
												<p className="text-xl">
													{item.title.english ||
														item.title.romaji}
												</p>
											</CardBody>
										</Card>
									</Link>
								))}
						</CardBody>
					</Card>
				</Tab>
				<Tab key="chapter" title="Chapter">
					<Card shadow="sm" className="p-2">
						<div className="flex items-center">
							<Select
								className="w-full lg:max-w-md"
								label="Select chapter"
							>
								{data.chapters &&
									data.chapters.length > 0 &&
									data.chapters.map((item, index) => {
										if (item.pages > 0) {
											return (
												<SelectItem
													key={index}
													onClick={async () =>
														await get_pages(item.id)
													}
													textValue={item.title}
												>
													{item.title} -{" "}
													{item.chapterNumber}
												</SelectItem>
											);
										} else {
											return;
										}
									})}
							</Select>
							<Button
								as={Link}
								href={url}
								className="mt-2 ml-2"
								size="lg"
								color="warning"
								variant="ghost"
							>
								Download
							</Button>
						</div>
						<CardBody>
							<div className="w-full">{pages}</div>
						</CardBody>
					</Card>
				</Tab>
			</Tabs>
		</div>
	);
};

export default MangaDescriptionTabs;
