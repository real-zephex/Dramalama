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
