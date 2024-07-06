import "./globals.css";
import Header from "./components/header/header";
import { lexend } from "../../config/fonts";

import { Providers } from "./themeManager";

export const metadata = {
	title: "Dramalama",
	description:
		"Online service to watch kdramas and anime for free. You can also read and download mangas for free.",
	generator: "Next.js",
	applicationName: "Dramalama",
	authors: [{ name: "zephex", url: "https://github.com/real-zephex" }],
	creator: "Zephex",
	keywords: [
		"Kdrama",
		"Anime",
		"Manga",
		"Watch Online",
		"watch kdrama free",
		"watch anime free online",
		"kdrama for free",
		"watch online",
		"read mangas for free",
		"mangas online",
		"movies online",
		"free movies online",
		"watch series for free",
	],
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
			<head>
				<script
					async
					src="https://www.googletagmanager.com/gtag/js?id=G-64S37Q7YY4"
				></script>
				<script
					dangerouslySetInnerHTML={{
						__html: `
					window.dataLayer = window.dataLayer || [];
					function gtag(){dataLayer.push(arguments);}
					gtag('js', new Date());
					gtag('config', 'G-64S37Q7YY4');
					`,
					}}
				></script>
			</head>

			<body>
				<Providers>
					<Header />
					{children}
				</Providers>
			</body>
		</html>
	);
}
