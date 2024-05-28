import { Card, CardHeader, CardBody, Divider, Link } from "@nextui-org/react";
import Image from "next/image";

export default async function Home() {
	const homePageCards = (title) => {
		return (
			// <Link href={`/${title}`} className="my-1">
			// 	<Card className="max-w-[400px]  border-1 border-gray-500">
			// 		<CardHeader className="flex gap-3">
			// 			<Image
			// 				alt="nextui logo"
			// 				height={40}
			// 				width={40}
			// 				src={url}
			// 				className="rounded-md"
			// 			/>
			// 			<div className="flex flex-col">
			// 				<p className="text-md">{title}</p>
			// 				<p className="text-small text-default-500">
			// 					dramalama/{title}
			// 				</p>
			// 			</div>
			// 		</CardHeader>
			// 		<Divider className="bg-slate-400" />
			// 		<CardBody>
			// 			<p>{message}</p>
			// 		</CardBody>
			// 	</Card>
			// </Link>
			<Link href={`/${title}`} className="mb-2 lg:mx-1">
				<Card isPressable shadow="lg">
					<CardBody>
						<p className="text-xl lg:text-2xl">{title}</p>
					</CardBody>
				</Card>
			</Link>
		);
	};

	return (
		<section className="h-screen w-screen flex flex-col items-center justify-center lg:flex-row ">
			{homePageCards("anime")}
			{homePageCards("movies")}
			{homePageCards("kdrama")}
			{homePageCards("web-series")}
		</section>
	);
}

// Test push
