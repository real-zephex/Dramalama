import "./recent.css";
import Image from "next/image";
import Link from "next/link";

export default async function Releases() {
	const data = await test();

	return (
		<div className="trendingContainer">
			<p className="trendingText">Recent Releases</p>

			<div className="trending">
				{data &&
					data.results.map((item, index) => (
						<Link
							key={index}
							href={`/info/${item.id}`}
							style={{ textDecoration: "none" }}
						>
							<div className="trendingEntries">
								<Image
									src={item.image}
									className="{trendingImage}"
									width={160}
									height={220}
									alt="Drama"
									priority
								/>
								<p>{item.title}</p>
							</div>
						</Link>
					))}
			</div>
		</div>
	);
}

async function test() {
	const res = await fetch(
		"https://dramalama-api.vercel.app/anime/gogoanime/recent-episodes"
	);
	const data = res.json();
	return data;
}
