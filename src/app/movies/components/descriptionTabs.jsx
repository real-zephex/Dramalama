"use client";

import { Tabs, Tab, Card, CardBody, Link } from "@nextui-org/react";
import { FiThumbsUp } from "react-icons/fi";
import { TiStarFullOutline } from "react-icons/ti";

import { lexend, atkinson } from "../../../../config/fonts";

export default function DescriptionTabs({ data: data }) {
	return (
		<div className="flex w-full flex-col">
			<Tabs aria-label="Options" className={lexend.className}>
				<Tab key="description" title="Description">
					<Card>
						<CardBody className={atkinson.className}>
							{data.overview || "No description found"}
						</CardBody>
					</Card>
				</Tab>
				<Tab key="episodes" title="Details">
					<Card>
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
								<strong>Released on</strong>:{" "}
								<span>{data.release_date || "not sure"}</span>
							</h4>
							<h4>
								<strong>Status</strong>:{" "}
								<span>{data.status || "not sure"}</span>
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
			</Tabs>
		</div>
	);
}
