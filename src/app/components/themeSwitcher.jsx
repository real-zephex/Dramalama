// app/components/ThemeSwitcher.tsx
"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import React from "react";
import { Switch } from "@nextui-org/react";
import { SunIcon } from "./sunIcon";
import { MoonIcon } from "./moonIcon";

export function ThemeSwitcher() {
	const [mounted, setMounted] = useState(false);
	const { theme, setTheme } = useTheme();

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null;

	return (
		<Switch
			defaultSelected
			size="sm"
			color="secondary"
			thumbIcon={({ isSelected, className }) =>
				isSelected ? (
					<SunIcon className={className} />
				) : (
					<MoonIcon className={className} />
				)
			}
			onClick={() => {
				if (theme === "light") {
					setTheme("dark");
				} else {
					setTheme("light");
				}
			}}
		></Switch>
	);
}
