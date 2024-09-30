import "./globals.css";
import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import { GoogleAnalytics } from "@next/third-parties/google";

import Navbar from "@/components/ui/navbar";
import { font_lexend } from "@/components/fonts";

const APP_NAME = "Dramaflix";
const APP_DEFAULT_TITLE = "Dramaflix";
const APP_TITLE_TEMPLATE = "%s - Dramaflix";
const APP_DESCRIPTION = "Your one stop solution for all your media needs.";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  keywords: [
    "streaming",
    "movies",
    "TV shows",
    "media",
    "piracy",
    "free streamig",
    "free movies",
    "free anime",
    "free kdramas",
    "watch online",
  ],
  icons: {
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark">
      <GoogleAnalytics gaId="G-64S37Q7YY4" />
      <body className={font_lexend.className} data-theme="dark">
        <NextTopLoader showSpinner={false} />
        <Navbar />
        <section data-theme="dark">{children}</section>
      </body>
    </html>
  );
}
