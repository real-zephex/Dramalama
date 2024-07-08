import {
	Card,
	CardBody,
	CardFooter,
	Button,
	CardHeader,
	Divider,
} from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
	const homePageCards = (title, image) => {
		return (
			<Link href={`/${title}`} className="lg:mx-1 mt-2">
				<Card
					className="w-40 bg-stone-900"
					isPressable
					isHoverable
					shadow="sm"
				>
					<CardHeader>
						<Image
							src={`/${image}`}
							alt="anime image"
							width={200}
							height={200}
							className="rounded-t-md w-full h-36"
						/>
					</CardHeader>
					<Divider />
					<CardBody>
						<p className="text-center">{title}</p>
					</CardBody>
				</Card>
			</Link>
		);
	};

	return (
		<main className="lg:w-7/12 m-auto">
			<div className="text-center mt-2">
				<p className="text-md text-gray-500">Welcome to</p>
				<br />
				<p className="mt-[-1.8rem] text-4xl">Dramalama</p>
				<p className="mt-1 text-sm text-neutral-500">
					Dramalama is a platform which lets you stream your favourite
					content for free.
				</p>
			</div>

			{/* <div>
				<section className="mt-2 bg-neutral-800 w-40 rounded-md p-1">
					<Image
						src="/todoroki.jpg"
						alt="anime image"
						width={200}
						height={200}
						className="rounded-t-md"
					/>
					<p className="text-center">Anime</p>
				</section>
			</div> */}
			<div className="flex items-center flex-col justify-center lg:flex-row">
				{homePageCards("anime", "todoroki.jpg")}
				{homePageCards("manga", "manga.jpg")}
			</div>

			<div className="flex items-center justify-center mt-2">
				<Button
					as={Link}
					color="default"
					href="/kdrama"
					className="mx-1"
				>
					Kdramas
				</Button>{" "}
				<Button
					as={Link}
					color="default"
					href="/movies"
					className="mx-1"
				>
					Movies
				</Button>
				<Button
					as={Link}
					color="default"
					href="/web-series"
					className="mx-1"
				>
					Web-Series
				</Button>
			</div>
		</main>
	);
}

// Test push
