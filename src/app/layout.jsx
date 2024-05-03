import { Lexend_Deca } from "next/font/google";
import "./globals.css";
import Header from "./components/header/header";
import Footer from "./components/footer/page";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

const lexend = Lexend_Deca({ subsets: ["latin"] });

export const metadata = {
	title: "Dramalama",
	description:
		"Online service to watch kdramas and anime for free. You can also read and download mangas for free.",
	generator: "Next.js",
	applicationName: "Dramalama",
	authors: [{ name: "zephex", url: "https://github.com/real-zephex" }],
	creator: "Zephex",
	keywords: ["Kdrama", "Anime", "Manga", "Watch Online"],
	robots: {
		index: true,
		follow: true,
		nocache: false,
		googleBot: {
			index: true,
			follow: true,
			noimageindex: false,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	verification: {
		google: "google",
		yandex: "yandex",
		yahoo: "yahoo",
		other: {
			me: ["zephex@duck.com"],
		},
	},
};

export default function RootLayout({ children }) {
	return (
		<html lang="en" className={lexend.className}>
			<body>
				<SpeedInsights />
				<Analytics />
				<Header />
				{children}
				<Footer />
			</body>
		</html>
	);
}
