/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "asianimg.pro",
				pathname: "/cover/**",
			},
			{
				protocol: "https",
				hostname: "www.pngall.com",
			},
			{
				protocol: "https",
				hostname: "gogocdn.net",
			},
			{
				protocol: "https",
				hostname: "asianimg.pro",
			},
			{
				protocol: "https",
				hostname: "s4.anilist.co",
			},
			{
				protocol: "https",
				hostname: "uploads.mangadex.org",
			},
		],
	},
	logging: {
		fetches: {
			fullUrl: true,
		},
	},
};

export default nextConfig;
