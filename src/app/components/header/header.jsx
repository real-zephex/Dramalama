import Link from "next/link";
import { ThemeSwitcher } from "../themeSwitcher";
import {
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	Button,
} from "@nextui-org/react";

export default async function Header() {
	return (
		<Navbar isBordered>
			<NavbarBrand>
				<p className="text-2xl font-bold">
					<Link href="/">Dramalama</Link>
				</p>
			</NavbarBrand>
			<NavbarContent className="hidden sm:flex gap-4" justify="center">
				<NavbarItem>
					<Link href="/anime" className="text-sky-400">
						Anime
					</Link>
				</NavbarItem>
				<NavbarItem>
					<Link href="/kdrama" className="text-green-300">
						K-Dramas
					</Link>
				</NavbarItem>
				<NavbarItem>
					<Link href="/manga" className="text-orange-400">
						Manga
					</Link>
				</NavbarItem>
				<NavbarItem>
					<Link href="/web-series" className="text-violet-300">
						TV shows
					</Link>
				</NavbarItem>
				<NavbarItem>
					<Link href="/movies" className="text-teal-400">
						Movies
					</Link>
				</NavbarItem>
			</NavbarContent>
			<NavbarContent justify="end">
				<NavbarItem>
					<ThemeSwitcher />
				</NavbarItem>
				<NavbarItem>
					<Button
						as={Link}
						color="success"
						href="https://github.com/real-zephex/Dramalama"
						variant="faded"
						target="_blank"
					>
						Github
					</Button>
				</NavbarItem>
			</NavbarContent>
		</Navbar>
	);
}
