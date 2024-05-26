import { Card, CardHeader, CardBody, Divider, Link } from "@nextui-org/react";
import Image from "next/image";

export default async function Home() {
	const homePageCards = (title, message, url) => {
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
			<Link
				href={`/${title}`}
				className="flex mb-2 lg:mx-2 text-center  transition ease-in delay-50 hover:scale-105  text-inherit bg-gray-200 dark:bg-[#1f1f1f] p-1 rounded-lg"
			>
				<section>
					<Image
						src={url}
						height={100}
						width={100}
						alt="section image"
						className="rounded-full overflow-visible"
					></Image>
					<p className="uppercase font-xl">{title}</p>
				</section>
			</Link>
		);
	};

	return (
		<section className="h-screen w-screen flex flex-col items-center justify-center lg:flex-row ">
			{homePageCards(
				"anime",
				"Gravity of anime constant state of falling into the depths of happiness and joy",
				"https://cdn3.iconfinder.com/data/icons/letters-and-numbers-1/32/letter_A_red-256.png"
			)}
			{homePageCards(
				"kdrama",
				"Infinity loop I'll watch just one k-drama, ok one more, ok wait...",
				"https://cdn3.iconfinder.com/data/icons/letters-and-numbers-1/32/letter_K_red-512.png"
			)}
			{homePageCards(
				"movies",
				"Dive into a world of thrilling adventure and heart-pounding suspense",
				"https://cdn3.iconfinder.com/data/icons/letters-and-numbers-1/32/letter_M_red-512.png"
			)}
		</section>
	);
}

// Test push
