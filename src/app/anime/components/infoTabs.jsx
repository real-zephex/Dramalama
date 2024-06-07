"use client";

import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";

import { lexend, atkinson } from "../../../../config/fonts";

export default function DescriptionTabs({ data: data }) {
	return (
		<div className="flex w-full flex-col">
			<Tabs aria-label="Options" className={lexend.className}>
				<Tab key="description" title="Description">
					<Card shadow="sm">
						<CardBody className={atkinson.className}>
							{data.description || "No description found"}
						</CardBody>
					</Card>
				</Tab>
				<Tab key="episodes" title="Details">
					<Card shadow="sm">
						<CardBody className={atkinson.className}>
							<h4>
								<strong>Episodes</strong>:{" "}
								<span>{data.totalEpisodes}</span>
							</h4>
							<h4>
								<strong>Type</strong>: <span>{data.type}</span>
							</h4>
							<h4>
								<strong>SUB/DUB</strong>:{" "}
								<span>{data.subOrDub.toUpperCase()}</span>
							</h4>
							<h4>
								<strong>Status</strong>:{" "}
								<span>{data.status}</span>
							</h4>
							<h4>
								<strong>Release Year</strong>:{" "}
								<span>{data.releaseDate}</span>
							</h4>
						</CardBody>
					</Card>
				</Tab>
			</Tabs>
		</div>
	);
}
