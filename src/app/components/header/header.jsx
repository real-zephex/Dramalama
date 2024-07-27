"use client";

import Link from "next/link";
import { ThemeSwitcher } from "../themeSwitcher";
import {
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	Button,
	Dropdown,
	DropdownTrigger,
	DropdownMenu,
	DropdownSection,
	DropdownItem,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Header() {
	const path = usePathname();
	const sections = ["anime", "kdrama", "movies", "web-series"];
	const [currentPage, setCurrentPage] = useState("");

	useEffect(() => {
		setCurrentPage(
			path.split("/")[1] !== "" ? path.split("/")[1] : "Homepage"
		);
	}, [path]);

	return (
		<Navbar isBordered>
			<NavbarBrand>
				<p className="text-2xl font-bold">
					<Link href="/">Dramalama</Link>
				</p>
			</NavbarBrand>
			<NavbarContent className="hidden sm:flex gap-4" justify="center">
				<Dropdown>
					<DropdownTrigger>
						<Button variant="bordered" size="sm">
							{currentPage}
						</Button>
					</DropdownTrigger>
					<DropdownMenu aria-label="Static Actions">
						{sections &&
							sections.map((item, index) => (
								<DropdownItem
									as={Link}
									href={`/${item}`}
									key={index}
									onClick={() => setCurrentPage(item)}
								>
									{item}
								</DropdownItem>
							))}
					</DropdownMenu>
				</Dropdown>
				<NavbarItem>
					<Button
						as={Link}
						href={"https://mangathingy.netlify.app"}
						size="sm"
						color="success"
						variant="faded"
						target="_blank"
					>
						Manga
					</Button>
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
