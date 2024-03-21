import "../search.css";
import Link from "next/link";
import Image from "next/image";

export default async function fetchedInfo(data) {
	return (
		<div className="animeEntry">
			{data ? (
				data.results && data.results.length > 0 ? (
					data.results.map((item, index) => (
						<Link
							key={index}
							href={`/info/${item.id}`}
							style={{ textDecoration: "none" }}
						>
							<div className="anime">
								<p>{item.title}</p>
								<Image
									src={item.image}
									className="animeImage"
									width={120}
									height={160}
									alt="Drama Poster"
								/>
							</div>
						</Link>
					))
				) : (
					<div style={{ margin: "0px auto" }}>
						<p
							style={{
								color: "white",
								fontFamily: "Kanit",
								fontSize: 18,
							}}
						>
							No results found
						</p>
					</div>
				)
			) : null}
		</div>
	);
}
