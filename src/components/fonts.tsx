import {
  Lexend_Deca,
  Atkinson_Hyperlegible,
  Raleway,
  Rubik,
} from "next/font/google";

export const font_rubik = Rubik({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-rubik",
});

export const font_atkinson = Atkinson_Hyperlegible({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-rubik",
});

export const font_raleway = Raleway({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-rubik",
});

export const font_lexend = Lexend_Deca({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-rubik",
});
