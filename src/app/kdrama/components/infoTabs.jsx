"use client";

import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";

import { lexend, atkinson } from "../../../../config/fonts";

export default function DescriptionTabs({ data: data }) {
	return (
		<div className="flex w-full flex-col">
			<Tabs aria-label="Options" className={lexend.className}>
				<Tab key="description" title="Description">
					<Card>
						<CardBody className={atkinson.className}>
							{data.description || "No description found"}
						</CardBody>
					</Card>
				</Tab>
				<Tab key="episodes" title="Details">
					<Card>
						<CardBody className={atkinson.className}>
							<h4>
								<strong>Episodes</strong>:{" "}
								<span>{data.episodes.length}</span>
							</h4>
							<h4>
								<strong>Duration</strong>:{" "}
								<span>{data.duration || "not found"}</span>
							</h4>
							<h4>
								<strong>Release Year</strong>:{" "}
								<span>{data.releaseDate}</span>
							</h4>
							<h4>
								<strong>Other Names</strong>:{" "}
								{data.otherNames &&
									data.otherNames.map((item, index) => (
										<span key={index}>
											{item}
											{index <
												data.otherNames.length - 1 &&
												", "}
										</span>
									))}
							</h4>
						</CardBody>
					</Card>
				</Tab>
			</Tabs>
		</div>
	);
}
