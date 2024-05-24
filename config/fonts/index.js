import {
	Lexend_Deca,
	Atkinson_Hyperlegible,
	Poppins,
	Fira_Code,
} from "next/font/google";

export const lexend = Lexend_Deca({
	subsets: ["latin"],
	weight: ["400"],
	variable: "--font-lexend",
});

export const atkinson = Atkinson_Hyperlegible({
	subsets: ["latin"],
	weight: "400",
	variable: "--font-atkinson",
});
