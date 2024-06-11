/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "asianimg.pro",
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
			{
				protocol: "https",
				hostname: "sup-proxy.zephex0-f6c.workers.dev",
			},
			{
				protocol: "https",
				hostname: "image.tmdb.org",
			},
			{
				hostname: "i.ibb.co",
			},
			{
				hostname: "ih1.redbubble.net",
			},
			{ hostname: "images.hdqwalls.com" },
			{ hostname: "cdn3.iconfinder.com" },
			{ hostname: "www.iconfinder.com" },
		],
	},
	logging: {
		fetches: {
			fullUrl: true,
		},
	},

	// experimental: {
	// 	serverActions: {
	// 		allowedOrigins: ["localhost:3000"],
	// 	},
	// },
};

export default nextConfig;
