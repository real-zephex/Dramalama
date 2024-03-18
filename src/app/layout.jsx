import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./header/header";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Dramalama V2.0",
	description: "Rewrite of dramalama in next",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<SpeedInsights />
				<Analytics />
				<Header />
				{children}
			</body>
		</html>
	);
}
