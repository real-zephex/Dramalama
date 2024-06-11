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
	const sections = ["anime", "kdrama", "manga", "movies", "web-series"];

	return (
		<Navbar isBordered>
			<NavbarBrand>
				<p className="text-2xl font-bold">
					<Link href="/">Dramalama</Link>
				</p>
			</NavbarBrand>
			<NavbarContent className="hidden sm:flex gap-4" justify="center">
				{sections &&
					sections.map((item, index) => (
						<NavbarItem key={index}>
							<Link href={`/${item}`}>{item}</Link>
						</NavbarItem>
					))}
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
