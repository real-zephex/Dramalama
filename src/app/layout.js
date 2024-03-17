import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./header/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Dramalama V2.0",
	description: "Rewrite of dramalama in next",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<Header />
				{children}
			</body>
		</html>
	);
}
