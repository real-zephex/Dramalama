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
	return (
		<main className="lg:w-7/12 m-auto max-h-[75dvh] h-screen flex flex-col items-center justify-center">
			<div className="text-center my-2">
				<p className="text-md text-gray-500">Welcome to</p>
				<br />
				<p className="mt-[-1.8rem] text-4xl">Dramalama</p>
				<p className="mt-1 text-sm text-neutral-500">
					Dramalama is a platform which lets you stream your favourite
					content for free.
				</p>
			</div>

			<div className="flex items-center flex-col justify-center lg:flex-row my-2">
				<Card isFooterBlurred radius="lg" className="border-none">
					<Image
						alt="Woman listing to music"
						className="object-cover"
						height={200}
						src="/todoroki.jpg"
						width={180}
					/>
					<CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
						<Button
							className="text-tiny text-white bg-black/50 w-full"
							variant="flat"
							color="default"
							radius="lg"
							size="sm"
							as={Link}
							href="/anime"
						>
							Anime
						</Button>
					</CardFooter>
				</Card>
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
