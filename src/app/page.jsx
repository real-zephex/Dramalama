import {
	Card,
	CardHeader,
	CardBody,
	Divider,
	Link,
	Image,
} from "@nextui-org/react";

export default async function Home() {
	const homePageCards = (title, message, url) => {
		return (
			<Link href={`/${title}`} className="my-1">
				<Card className="max-w-[400px]  border-1 border-gray-500">
					<CardHeader className="flex gap-3">
						<Image
							alt="nextui logo"
							height={40}
							width={40}
							radius="sm"
							src={url}
						/>
						<div className="flex flex-col">
							<p className="text-md">{title}</p>
							<p className="text-small text-default-500">
								dramalama/{title}
							</p>
						</div>
					</CardHeader>
					<Divider className="bg-slate-400" />
					<CardBody>
						<p>{message}</p>
					</CardBody>
				</Card>
			</Link>
		);
	};

	return (
		<section className="h-screen w-screen flex flex-col items-center justify-center ">
			{homePageCards(
				"anime",
				"Gravity of anime constant state of falling into the depths of happiness and joy",
				"https://i.ibb.co/bLJzm3T/Whats-App-Image-2024-05-23-at-22-05-59-09933e5f.jpg"
			)}
			{homePageCards(
				"kdrama",
				"Infinity loop I'll watch just one k-drama, ok one more, ok wait...",
				"https://ih1.redbubble.net/image.2656505524.2951/poster,504x498,f8f8f8-pad,600x600,f8f8f8.jpg"
			)}
			{homePageCards(
				"movies",
				"Dive into a world of thrilling adventure and heart-pounding suspense",
				"https://images.hdqwalls.com/download/poster-avengers-endgame-ni-1920x1080.jpg"
			)}
		</section>
	);
}

// Test push
