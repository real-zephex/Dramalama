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
import { useState } from "react";

export default function Header() {
	const sections = ["anime", "kdrama", "movies", "web-series", "manga"];
	const [currentPage, setCurrentPage] = useState("Homepage");

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
							sections.slice(0, 4).map((item, index) => (
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
				{sections &&
					sections.slice(-1).map((item, index) => (
						<NavbarItem key={index}>
							<Button
								as={Link}
								href={`/${item}`}
								size="sm"
								color="success"
								variant="faded"
								onClick={() => setCurrentPage(item)}
							>
								{item}
							</Button>
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
