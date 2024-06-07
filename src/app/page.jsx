import { Card, CardBody } from "@nextui-org/react";
import Link from "next/link";

export default async function Home() {
	const homePageCards = (title) => {
		return (
			<Link href={`/${title}`} className="focus:scale(90) mb-2 lg:mx-1">
				<Card isPressable shadow="sm" isHoverable>
					<CardBody>
						<p className="text-xl lg:text-2xl">{title}</p>
					</CardBody>
				</Card>
			</Link>
		);
	};

	return (
		<main>
			<section className="flex h-[90dvh] w-screen flex-col items-center justify-center lg:flex-row">
				{homePageCards("anime")}
				{homePageCards("movies")}
				{homePageCards("kdrama")}
				{homePageCards("web-series")}
				{homePageCards("manga")}
			</section>
		</main>
	);
}

// Test push
